import React from 'react';
import { ORDER_TYPES } from '../conf/order';
import ProductsSummary from './ProductsSummary';
import ClientSummary from './ClientSummary';

const Confirmation = ({ address, pizzas, pizzaPrice = 0, orderType, handleEmitOrder }) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <ProductsSummary pizzas={pizzas} pizzaPrice={pizzaPrice} />
      </div>
      <div className="col-sm-12 col-md-6">
        <ClientSummary address={address} orderType={orderType} />
      </div>
      <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
        <button type="button" className="btn btn-success btn-lg" onClick={handleEmitOrder}>
          Colocar orden
          <i className="fa fa-shopping-cart px-1"></i>
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
