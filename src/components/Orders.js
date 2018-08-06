import React, { Component } from 'react';
import { database } from '../firebase';
import { getEndOfDay, getStartOfDay } from '../helpers/date';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };

    this.ordersRef = database.collection('orders');
  }

  componentDidMount () {
    this.ordersRef
      .where("date", ">=", getStartOfDay())
      .where("date", "<", getEndOfDay())
      .get()
      .then((querySnapshot) => {
        const orders = {};

        querySnapshot.forEach(function(doc) {
          orders[doc.id] = doc.data();
        });

        this.setState({ orders });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

  }
  render() {
    return (
      <h1>Vista de ordenes</h1>
    );
  }
}

export default Orders;
