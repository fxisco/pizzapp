import React from 'react';

const AddressForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="place">Domicilio</label>
            <select className="form-control" id="place">
              <option>Casa</option>
              <option>Apartamento</option>
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <label htmlFor="street">Calle</label>
            <input type="email" className="form-control" id="street"  />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="number"># Casa o Apartamento</label>
              <input type="email" className="form-control" id="number"  />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="instructions">Instrucciones de entrega</label>
              <input type="email" className="form-control" id="instructions"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
