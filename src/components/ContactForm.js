import React from 'react';
import { HOME_TYPES } from '../conf/constants';
import { handleOnlyNumbersValidation } from '../helpers/validation';
import { ORDER_TYPES } from '../conf/order';

const ContactForm = ({ name, telephone, instructions, orderType, number, handleInputChange, street, typeOfHome }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 text-left">
          <p className="font-weight-bold"><span className="text-danger">*</span> Campos requeridos</p>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="street">Nombre<span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="name" id="name" value={name} onChange={handleInputChange} />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="street">Télefono contacto<span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="telephone" id="telephone" value={telephone} onChange={handleInputChange} onKeyPress={handleOnlyNumbersValidation} />
          </div>
        </div>
        { orderType === ORDER_TYPES.DELIVERY && [
          <div key="typeOfHome" className="col-sm-12 col-md-6">
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
          </div>,
          <div key="street" className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor="street">Calle<span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="street" id="street" value={street} onChange={handleInputChange} />
            </div>
          </div>,
          <div key="number" className="col-sm-12 col-md-6">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="number"># Casa o Apartamento<span className="text-danger">*</span></label>
                <input type="text" className="form-control" id="number" name="number" value={number} onChange={handleInputChange} />
              </div>
            </div>
          </div>,
          <div key="instructions" className="col-sm-6">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="instructions">Instrucciones de entrega</label>
                <input type="text" className="form-control" id="instructions" name="instructions" value={instructions} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          ]}
      </div>
    </div>
  );
};

export default ContactForm;
