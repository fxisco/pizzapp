import React from 'react';
import { formatPizzaIngredientsByProportions } from '../helpers/pizza';
import { INGREDIENTS_PROPORTIONS } from '../conf/constants';

const Confirmation = ({ address, pizzas, pizzaPrice = 0 }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table">
            <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody>
            {pizzas.map((pizza, index) => {
              const ingredientsByProportions = formatPizzaIngredientsByProportions(pizza);
              return (
                <tr key={`pizza-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {Object.keys(INGREDIENTS_PROPORTIONS).map((item) => {
                      return ingredientsByProportions[item].length > 0 ? (
                        <div key={item}>
                          <b>{INGREDIENTS_PROPORTIONS[item]}</b>: {ingredientsByProportions[item].join(', ')}
                        </div>
                      ) : null;
                    })}
                  </td>
                  <td>{pizzaPrice}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="2" className="text-right"><b>Total($):</b></td>
              <td><h3>{pizzaPrice * pizzas.length}</h3></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 col-md-6">
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
              <tr>
                <td><b>Número</b></td>
                <td>{address.number}</td>
              </tr>
              <tr>
                <td><b>Calle</b></td>
                <td>{address.street}</td>
              </tr>
              <tr>
                <td><b>Instrucciones</b></td>
                <td>{address.instructions}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
          <button type="button" className="btn btn-success btn-lg">
            Colocar orden
            <i className="fa fa-shopping-cart px-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
