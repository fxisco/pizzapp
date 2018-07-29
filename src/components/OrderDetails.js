import React, { Component } from 'react';

class OrderDetails extends Component {
  render() {
    const { match } = this.props;

    return (
      <h1>Order: {match.params.id}</h1>
    );
  }
}

export default OrderDetails;
