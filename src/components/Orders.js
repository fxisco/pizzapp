import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { database } from '../firebase';
import { getEndOfDay, getStartOfDay, getDate } from '../helpers/date';
import { ORDER_TYPES as TYPES, MAX_CLICKS_TO_CANCEL } from '../conf/constants';
import { CONTEXT_MENU } from '../helpers/constants';
import { ORDER_STATUS, ORDER_TYPES } from '../conf/order';
import {
  getOrderNextStatus,
  getOrderPreviousStatus,
  filterOrdersByStatus,
  showIngredientsByProportion
} from '../helpers/order';

import 'react-datepicker/dist/react-datepicker.css';

const DOUBLE_CLICK_MAX_TIME = 1000;

const Order = ({ id, orderType, pizzas, onDoubleClick = () => {}, onContextMenu = () => {} }) => {
  const pizzasFormatted = pizzas.map((pizza, index) => {

    const ingredientsByProportion = showIngredientsByProportion(pizza);

    return (
      <li key={index} className="list-group-item">
        {ingredientsByProportion}
      </li>
    );
  });

  return (
    <div className="card mb-3 shadow" onDoubleClick={onDoubleClick.bind(null, id)} onContextMenu={(event) => onContextMenu(event, id)}>
      <div className={`card-header ${orderType === ORDER_TYPES.DELIVERY ? "bg-info" : "bg-primary"}`}>
        <b className="text-white">{TYPES[orderType]}</b>
      </div>
      <ul className="list-group">
        {pizzasFormatted}
      </ul>
    </div>
  );
};

class Orders extends Component {
  constructor(props) {
    super(props);

    this.timeOut = null;
    this.unsubscribe = null;

    this.state = {
      date: getDate(),
      orders: {},
      contextMenuClick: 0
    };

    this.ordersRef = database.collection('orders');

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.subscribeListener = this.subscribeListener.bind(this);
  }

  componentDidMount () {
    this.subscribeListener();
  }

  subscribeListener () {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.unsubscribe = this.ordersRef
      .where("date", ">=", getStartOfDay(this.state.date))
      .where("date", "<", getEndOfDay(this.state.date))
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log('::added');
            this.setState({ orders: {
              ...this.state.orders,
              [change.doc.id]: change.doc.data()
            }});
          }
          if (change.type === "modified") {
            const order = change.doc.data();

            this.setState({
              orders: {
                ...this.state.orders,
                [order.id]: {
                  ...order
                }
              }
            });
          }

          if (change.type === "removed") {
            console.log("Removed: ", change.doc.data());
          }
        });
      });
  }

  handleDoubleClick(id) {
    const order = this.state.orders[id];
    const nextStatus = getOrderNextStatus(order);

    if (order.status !== nextStatus) {
      this.ordersRef
        .doc(id)
        .set({ status: nextStatus }, { merge: true })
    }
  }

  handleContextMenu(event, id) {
    event.preventDefault();

    if (event.type === CONTEXT_MENU) {
      clearTimeout(this.timeOut);
      let clicks = this.state.contextMenuClick + 1;

      if (clicks === MAX_CLICKS_TO_CANCEL) {
        const order = this.state.orders[id];
        const previousStatus = getOrderPreviousStatus(order);

        clicks = 0;

        if (previousStatus !== order.status) {
          this.ordersRef
            .doc(id)
            .set({ status: previousStatus }, { merge: true })
        }
      }

      this.setState({
        contextMenuClick: clicks
      }, () => {
        this.timeOut = setTimeout(() => {
          this.setState({
            contextMenuClick: 0
          })
        }, DOUBLE_CLICK_MAX_TIME);
      })
    }
  }

  handleDateChange (date) {
    this.setState({
      date,
      orders: {},
    }, () => {
      this.subscribeListener();
    });
  }

  render() {
    const { date, orders } = this.state;
    const ordersEmmited = filterOrdersByStatus(orders, ORDER_STATUS.EMITTED);
    const ordersInPreparation = filterOrdersByStatus(orders, ORDER_STATUS.IN_PREPARATION);
    const ordersCooking = filterOrdersByStatus(orders, ORDER_STATUS.COOKING);
    const ordersReady = filterOrdersByStatus(orders, ORDER_STATUS.READY);
    const ordersOnDelivery = filterOrdersByStatus(orders, ORDER_STATUS.ON_DELIVERY);

    return (
      <div className="container-fluid">
        <h1>Vista de ordenes</h1>
        <div className="row">
          <div className="col-12 py-5">
            <DatePicker
              selected={date}
              onChange={this.handleDateChange}
            />
          </div>
        </div>
        <div className="row justify-content-center py-2">
          <div className="col col-md-2">
            <div className="card shadow-lg">
              <div className="card-header">
                <b>Ordenes entrantes</b>
              </div>
              <div className="card-body bg-light">
                {ordersEmmited
                  .map((orderId) => {
                  const order = orders[orderId];

                  return (
                    <Order
                      key={orderId}
                      {...order}
                      onDoubleClick={this.handleDoubleClick}
                      onContextMenu={this.handleContextMenu}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col col-md-2">
            <div className="card shadow-lg">
              <div className="card-header bg-warning text-white">
                <b>En preparación</b>
              </div>
              <div className="card-body bg-light">
                {ordersInPreparation
                  .map((orderId) => {
                    const order = orders[orderId];

                    return (
                      <Order
                        key={orderId}
                        {...order}
                        onDoubleClick={this.handleDoubleClick}
                        onContextMenu={this.handleContextMenu}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col col-md-2">
            <div className="card shadow-lg">
              <div className="card-header bg-danger text-white">
                <b>En el horno</b>
              </div>
              <div className="card-body bg-light">
                {ordersCooking
                  .map((orderId) => {
                    const order = orders[orderId];

                    return (
                      <Order
                        key={orderId}
                        {...order}
                        onDoubleClick={this.handleDoubleClick}
                        onContextMenu={this.handleContextMenu}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col col-md-2">
            <div className="card shadow-lg">
              <div className="card-header bg-info text-white">
                <b>Ordenes en delivery</b>
              </div>
              <div className="card-body bg-light">
                {ordersOnDelivery
                  .map((orderId) => {
                    const order = orders[orderId];

                    return (
                      <Order
                        key={orderId}
                        {...order}
                        onDoubleClick={this.handleDoubleClick}
                        onContextMenu={this.handleContextMenu}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col col-md-2">
            <div className="card shadow-lg">
              <div className="card-header bg-success text-white">
                <b>Orden Lista</b>
              </div>
              <div className="card-body bg-light">
                {ordersReady
                  .map((orderId) => {
                    const order = orders[orderId];

                    return (
                      <Order
                        key={orderId}
                        {...order}
                        onDoubleClick={this.handleDoubleClick}
                        onContextMenu={this.handleContextMenu}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
