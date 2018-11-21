import React, { Component } from 'react';
import { handleOnlyNumbersValidation } from '../helpers/validation';
import { database } from '../firebase';

class Products extends Component {
  constructor(props) {
    super(props);

    this.productsRef = database.collection('products');
    this.unsubscribe = null;

    this.state = {
      name: '',
      price: '',
      selectedId: '',
      products: {},
      showAddForm: false,
      showEditForm: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditProduct = this.handleEditProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.subscribeListener = this.subscribeListener.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleProductActivation = this.handleProductActivation.bind(this);
  }

  componentDidMount () {
    this.subscribeListener();
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  saveProduct () {
    const newRegistry = this.productsRef.doc();
    const {
      name,
      price = 0,
      showEditForm,
      selectedId
    } = this.state;

    if (showEditForm) {
      this.productsRef
        .doc(selectedId)
        .set({ price }, { merge: true })
    } else {
      this.productsRef.doc(newRegistry.id).set({
        id: newRegistry.id,
        active: true,
        name,
        price: parseInt(price)
      });
    }

    this.resetForm();
  }

  resetForm () {
    this.setState({
      name: '',
      price: '',
      showAddForm: false,
      showEditForm: false
    });
  }

  subscribeListener () {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.unsubscribe = this.productsRef
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.setState({ products: {
              ...this.state.products,
              [change.doc.id]: change.doc.data()
            }});
          }

          if (change.type === "modified") {
            const product = change.doc.data();

            this.setState({
              products: {
                ...this.state.products,
                [product.id]: {
                  ...product
                }
              }
            });
          }

          if (change.type === "removed") {
            console.log("Removed: ", change.doc.data());
          }
        });
      });
  }

  showForm () {
    this.setState({
      showAddForm: true
    })
  }

  handleEditProduct(id) {
    const { products } = this.state;

    this.setState({
      name: products[id].name,
      price: products[id].price,
      showEditForm: true,
      selectedId: id
    })
  }

  handleProductActivation(id) {
    const {
      products
    } = this.state;

    this.productsRef
      .doc(id)
      .set({ active: !products[id].active }, { merge: true });
  }

  render() {
    const { name, price, products, showAddForm, showEditForm } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Productos</h1>
          </div>
        </div>
        <div className="row">
          <div className="col text-left">
            {(!showAddForm && !showEditForm) &&
              <button className="btn btn-success" onClick={this.showForm}>Agregar Producto</button>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {(showAddForm || showEditForm) &&
              <div className="card product-form">
                <div className="card-body">
                  <h5 className="card-title text-left">{showEditForm ? 'Editar Producto' : 'Nuevo Producto'}</h5>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="productName">Nombre</label>
                          <input name="name" className="form-control" type="text" id="productName" value={name} onChange={this.handleInputChange} readOnly={showEditForm} />
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
                        {name && price && <button className="btn btn-success" onClick={this.saveProduct}>Guardar</button>}
                      </div>
                    </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="row my-5">
          {Object.keys(products).map((key) => {
            const item = products[key];

            return (
              <div key={`product-${key}`} className="col-sm-12 col-md-6 col-lg-3">
                <div className="card product-card">
                  <div className="card-body">
                    <div className="actions">
                      <button
                        type="button"
                        className={`btn btn-sm ${item.active ? 'btn-success' : 'btn-danger' }`}
                        onClick={this.handleProductActivation.bind(null, key)}
                      >
                        {item.active ? 'Activo': 'Desactivado'}
                      </button>
                      <button className="action-button" onClick={this.handleEditProduct.bind(null, key)}>
                        <i className="fa fa-pencil px-1" />
                      </button>
                    </div>
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
