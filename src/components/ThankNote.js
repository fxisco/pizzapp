import React from 'react';
import { Link } from 'react-router-dom';

const ThankNote = ({ orderId = 0 }) => (
  <div className="row">
    <div className="col-sm-12">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Su orden fue colocada</h4>
        <p>Puedes seguir el estado de tu orden <Link to={`order/${orderId}`}><b>Aquí</b></Link></p>
        <hr />
          <p className="mb-0">Gracias por preferirnos!</p>
      </div>
    </div>
  </div>
);

export default ThankNote;
