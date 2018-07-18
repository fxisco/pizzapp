import React, { Component } from 'react';
import { getOrderName } from '../helpers/order';
import { TYPES } from '../conf/order';
import AddressForm  from './AddressForm';

class Cart extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      step: props.type === TYPES.DELIVERY ? 'order-address' : 'choose-quantity'
    }
  }
  render () {
    const { step } = this.state;

    return (
      <div className="container">
        <div className="card shadow-lg">
          <h2 className="card-header">
            {getOrderName(this.props.type)}
          </h2>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                {step === 'order-address' &&
                <AddressForm />
                }
              </div>
              <div className="col-12 px-4 pt-5 pb-3">
                <button className="btn btn-danger float-left">Regresar</button>
                <button className="btn btn-success float-right">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
