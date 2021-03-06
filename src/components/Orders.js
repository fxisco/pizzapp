import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { database } from '../firebase';
import { getEndOfDay, getStartOfDay, getDate } from '../helpers/date';
import { ORDER_TYPES as TYPES, HOME_TYPES } from '../conf/constants';
import {
  BOARD,
  BOARD_TABLES,
  ORDER_STATUS,
  ORDER_TYPES
} from '../conf/order';
import {
  getOrderNextStatus,
  getOrderPreviousStatus,
  filterOrdersByStatus,
  showIngredientsByProportion
} from '../helpers/order';

import 'react-datepicker/dist/react-datepicker.css';


const Order = ({
  id,
  instructions = '',
  orderType,
  name = '',
  number = '',
  pizzas,
  typeOfHome,
  telephone = '',
  status,
  street = '',
  moveForward = () => {},
  moveBackward = () => {} }) => {
  const pizzasFormatted = pizzas.map((pizza, index) => {

    const ingredientsByProportion = showIngredientsByProportion(pizza);

    return (
      <li key={index} className="list-group-item">
        {ingredientsByProportion}
      </li>
    );
  });

  const isDelivery = orderType === ORDER_TYPES.DELIVERY;

  return (
    <div className="card mb-3 shadow">
      <div className={`card-header ${isDelivery ? "bg-info" : "bg-primary"}`}>
        {!(status === ORDER_STATUS.ISSUED) &&
        <button className="action-button left" onClick={moveBackward.bind(null, id)}>
          <i className="fa fa-arrow-circle-left px-1" />
        </button>
        }
        <b className="text-white">{TYPES[orderType]}</b>
        {!(status === ORDER_STATUS.DELIVERY || status === ORDER_STATUS.READY) &&
        <button className="action-button right" onClick={moveForward.bind(null, id)}>
          <i className="fa fa-arrow-circle-right px-1"/>
        </button>
        }
      </div>
      <ul className="list-group">
        {pizzasFormatted}
        <li className={`list-group-item bg-light ${isDelivery ? "border-info" : "border-primary"}`}>
          {orderType === ORDER_TYPES.PICKUP &&
          <div className="detail text-secondary">
            <div>
              {name}
            </div>
            <div>
              {telephone}
            </div>
          </div>
          }
          {orderType === ORDER_TYPES.DELIVERY &&
          <div className="detail text-secondary">
            <div>
              {name}
            </div>
            <div>
              {telephone}
            </div>
            <div>
              <b>{HOME_TYPES[typeOfHome]} {number}</b>
            </div>
            <div>
              <b>Calle</b>: {street}
            </div>
            {instructions &&
              <div>
                {instructions}
              </div>
            }
          </div>
          }
        </li>
      </ul>
    </div>
  );
};

class Orders extends Component {
  constructor(props) {
    super(props);

    this.unsubscribe = null;

    this.state = {
      date: getDate(),
      orders: {},
    };

    this.ordersRef = database.collection('orders');

    this.handleMoveForward = this.handleMoveForward.bind(this);
    this.handleMoveBackward = this.handleMoveBackward.bind(this);
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

  handleMoveForward(id) {
    const order = this.state.orders[id];
    const nextStatus = getOrderNextStatus(order);

    if (order.status !== nextStatus) {
      this.ordersRef
        .doc(id)
        .set({ status: nextStatus }, { merge: true })
    }
  }

  handleMoveBackward(id) {
    const order = this.state.orders[id];
    const previousStatus = getOrderPreviousStatus(order);

    if (previousStatus !== order.status) {
      this.ordersRef
        .doc(id)
        .set({ status: previousStatus }, { merge: true });
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
          {BOARD.map((table) => {
            const filteredOrders = filterOrdersByStatus(orders, table);
            const selectedTable = BOARD_TABLES[table];

            return (
              <div className="col col-md-2">
                <div className="card shadow-lg">
                  <div className={`card-header ${selectedTable.titleColor}`}>
                    <b>{selectedTable.title}</b>
                  </div>
                  <div className="card-body">
                    {filteredOrders
                      .map((orderId) => {
                        const order = orders[orderId];

                        return (
                          <Order
                            key={orderId}
                            {...order}
                            moveForward={this.handleMoveForward}
                            moveBackward={this.handleMoveBackward}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Orders;
