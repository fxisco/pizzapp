import React, { Component } from 'react';
import { database } from '../firebase';
import ProductsSummary from './ProductsSummary';
import ClientSummary from './ClientSummary';
import { ORDER_TYPES, ORDER_STATUS_MESSAGE } from '../conf/constants';
import { ORDER_STATUS } from '../conf/order';

const STATUS_CLASS = {
  [ORDER_STATUS.ISSUED]: 'status--issued',
  [ORDER_STATUS.IN_PREPARATION]: 'status--in-preparation',
  [ORDER_STATUS.COOKING]: 'status--cooking',
  [ORDER_STATUS.ON_DELIVERY]: 'status--on-delivery',
  [ORDER_STATUS.READY]: 'status--ready',
};

const STATUS_VALUE = {
  [ORDER_STATUS.ISSUED]: 10,
  [ORDER_STATUS.IN_PREPARATION]: 25,
  [ORDER_STATUS.COOKING]: 75,
  [ORDER_STATUS.READY]: 100,
  [ORDER_STATUS.ON_DELIVERY]: 100,
};

const STATUS_COLOR = {
  [ORDER_STATUS.ISSUED]: '',
  [ORDER_STATUS.IN_PREPARATION]: 'warning',
  [ORDER_STATUS.COOKING]: 'danger',
  [ORDER_STATUS.READY]: 'success',
  [ORDER_STATUS.ON_DELIVERY]: 'info',
};

class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null
    };

    this.orderRef = database.collection('orders');
  }

  componentDidMount() {
    const { match } = this.props;

    this.orderRef.doc(match.params.id).onSnapshot((doc) => {
      this.setState({
        order: doc.data()
      });
    });
  }

  render() {
    const { order } = this.state;

    if (!order) {
      return null;
    }

    const { price = 0 } = this.props;
    const {
      instructions,
      name,
      number,
      pizzas,
      street,
      telephone,
      typeOfHome,
      status
    } = order;

    return (
      <div className="container">
        <h1>Order: {ORDER_TYPES[order.orderType]}</h1>
        <div className="row my-4">
          <div className="col-sm-12">
            <h2>Estado: <b className={`text-${STATUS_COLOR[status]}`}>{ORDER_STATUS_MESSAGE[status]}</b></h2>
            <div className="progress">
              <div className={`progress-bar progress-bar-striped progress-bar-animated ${STATUS_CLASS[status]} bg-${STATUS_COLOR[status]}`} role="progressbar" aria-valuenow={STATUS_VALUE[status]} aria-valuemin="0" aria-valuemax="100" />
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-sm-12">
            <ClientSummary address={{
              name,
              telephone,
              instructions,
              number,
              typeOfHome,
              street}} orderType={order.orderType} />
          </div>
        </div>
        <div className="row my-4">
          <div className="col-sm-12">
            <ProductsSummary pizzas={pizzas} pizzaPrice={price} />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
