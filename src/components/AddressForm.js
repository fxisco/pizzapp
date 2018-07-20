import React from 'react';
import { HOME_TYPES } from '../conf/constants';

const AddressForm = ({ name, telephone, instructions, number, handleInputChange, street, typeOfHome }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="street">Nombre</label>
            <input type="email" className="form-control" name="name" id="name" value={name} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="street">Télefono contacto</label>
            <input type="email" className="form-control" name="contact" id="contact" value={telephone} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="place">Domicilio</label>
            <select className="form-control" name="typeOfHome" id="place" value={typeOfHome} onChange={handleInputChange}>
              {Object.keys(HOME_TYPES).map((type, key) => {
                return (
                  <option value={type} key={key}>{HOME_TYPES[type]}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="street">Calle</label>
            <input type="email" className="form-control" name="street" id="street" value={street} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="number"># Casa o Apartamento</label>
              <input type="email" className="form-control" id="number" name="number" value={number} onChange={handleInputChange} />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="instructions">Instrucciones de entrega</label>
              <input type="email" className="form-control" id="instructions" name="instructions" value={instructions} onChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
