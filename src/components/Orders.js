import React, { Component } from 'react';
import { database } from '../firebase';
import { getEndOfDay, getStartOfDay } from '../helpers/date';
import { ORDER_TYPES as TYPES } from '../conf/constants';
import { ORDER_STATUS, ORDER_TYPES } from '../conf/order';
import { filterOrdersByStatus, showIngredientsByProportion } from '../helpers/order';

const Order = ({ orderType, pizzas }) => {
  const pizzasFormatted = pizzas.map((pizza, index) => {

    const ingredientsByProportion = showIngredientsByProportion(pizza);

    return (
      <li key={index} className="list-group-item">
        {ingredientsByProportion}
      </li>
    );
  });

  return (
    <div className="card mb-3 shadow">
      <div className={`card-header ${orderType === ORDER_TYPES.DELIVERY ? "bg-primary" : "bg-info"}`}>
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

    this.state = {
      orders: {}
    };

    this.ordersRef = database.collection('orders');
  }

  componentDidMount () {
    this.ordersRef
      .where("date", ">=", getStartOfDay())
      .where("date", "<", getEndOfDay())
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.setState({ orders: {
              ...this.state.orders,
              [change.doc.id]: change.doc.data()
            }});
          }
          if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed: ", change.doc.data());
          }
        });
      });
  }
  render() {
    const { orders } = this.state;
    const ordersEmmited = filterOrdersByStatus(orders, ORDER_STATUS.EMITTED);
    const ordersInPreparation = filterOrdersByStatus(orders, ORDER_STATUS.IN_PREPARATION);
    const ordersCooking = filterOrdersByStatus(orders, ORDER_STATUS.COOKING);
    const ordersReady = filterOrdersByStatus(orders, ORDER_STATUS.READY);
    const ordersOnDelivery = filterOrdersByStatus(orders, ORDER_STATUS.ON_DELIVERY);

    return (
      <div className="container-fluid">
        <h1>Vista de ordenes</h1>
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
                    <Order key={orderId} {...order} />
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
                      <Order key={orderId} {...order} />
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
                      <Order key={orderId} {...order} />
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
                      <Order key={orderId} {...order} />
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
                      <Order key={orderId} {...order} />
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
