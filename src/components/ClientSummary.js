import React from 'react';
import { ORDER_TYPES } from '../conf/constants';

const ClientSummary = ({ address, orderType }) => (
  <table className="table">
    <thead className="thead-dark">
    <tr>
      <th scope="col" colSpan="2">Datos</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><b>Nombre</b></td>
      <td>{address.name}</td>
    </tr>
    <tr>
      <td><b>Teléfono</b></td>
      <td>{address.telephone}</td>
    </tr>
    {orderType === ORDER_TYPES.DELIVERY && [
      <tr key="confirmation-number">
        <td><b>Número</b></td>
        <td>{address.number}</td>
      </tr>,
      <tr key="confirmation-street">
        <td><b>Calle</b></td>
        <td>{address.street}</td>
      </tr>,
      <tr key="confirmation-instruction">
        <td><b>Instrucciones</b></td>
        <td>{address.instructions}</td>
      </tr>
    ]}
    </tbody>
  </table>
);

export default ClientSummary;
