import React from 'react';
import { ORDER_TYPES } from '../conf/order'

const OrderTypePicker = ({ handleTypePick }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={handleTypePick.bind(null, ORDER_TYPES.DELIVERY)}>Domicilio</button>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={handleTypePick.bind(null, ORDER_TYPES.PICKUP)}>Para recoger</button>
        </div>
      </div>
    </div>
  );
};

export default OrderTypePicker;
