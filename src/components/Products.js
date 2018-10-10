import React, { Component } from 'react';
import { handleOnlyNumbersValidation } from '../helpers/validation';
import { database } from '../firebase';

class Products extends Component {
  constructor(props) {
    super(props);

    this.productsRef = database.collection('products');

    this.state = {
      name: '',
      price: '',
      products: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addProduct () {
    const newRegistry = this.productsRef.doc();
    const { name, price = 0 } = this.state;

    this.productsRef.doc(newRegistry.id).set({
      id: newRegistry.id,
      active: true,
      name,
      price: parseInt(price)
    });

    this.resetForm();
  }

  resetForm () {
    this.setState({
      name: '',
      price: ''
    });
  }

  render() {
    const { name, price, products } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Productos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-left">Nuevo producto</h5>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="productName">Nombre</label>
                      <input name="name" className="form-control" type="text" id="productName" value={name} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="productPrice">Precio</label>
                      <input name="price" className="form-control" type="text" id="productPrice" onChange={this.handleInputChange} onKeyPress={handleOnlyNumbersValidation} value={price} />
                    </div>
                  </div>
                  <div className="col-12 text-right">
                    <button className="btn btn-danger mr-2" onClick={this.resetForm}>Cancelar</button>
                    {name && price && <button className="btn btn-success" onClick={this.addProduct}>Guardar</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          {products.map((item, index) => {
            return (
              <div key={`product-${index}`} className="col-sm-12 col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="text-right"><button type="button" className={`btn ${item.active ? 'btn-success' : 'btn-danger' }`}>{item.active ? 'Activo': 'Desactivado'}</button></div>
                    <h5 className="card-title text-left">{item.name}</h5>
                    <div><b>Price</b>: ${item.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default Products;
