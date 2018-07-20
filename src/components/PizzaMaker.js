import React, { Component } from 'react';
import { createPizza } from '../helpers/pizza';
import { INGREDIENTS } from '../conf/constants';

class PizzaMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pizzas: []
    };

    this.addPizza = this.addPizza.bind(this);
    this.removePizza = this.removePizza.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }

  addPizza() {
    const { pizzas } = this.state;

    this.setState({
      pizzas: [...pizzas, createPizza()]
    });
  }

  removePizza(index) {
    const { pizzas } = this.state;

    this.setState({
      pizzas: [
        ...pizzas.slice(0, index),
        ...pizzas.slice(index + 1)
      ]
    });
  }

  addIngredient(pizzaId, ingredientId) {
    const { pizzas } = this.state;
    const pizza = pizzas[pizzaId];
    let update;

    if (!pizza.ingredients[ingredientId]) {
      update = {
        pizzas: [
          ...pizzas.slice(0, pizzaId),
          {
            ...pizza,
            ingredients: {
              ...pizza.ingredients,
              [ingredientId]: true
            }
          },
          ...pizzas.slice(pizzaId + 1),
        ]
      };
    } else {
      delete pizza.ingredients[ingredientId];

      update = {
        pizzas: [
          ...pizzas.slice(0, pizzaId),
          {
            ...pizza
          },
          ...pizzas.slice(pizzaId + 1),
        ]
      };
    }

    this.setState(update);
  }

  render() {
    const { pizzas } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            Número de pizzas: <b className="number-of-pizzas align-middle">{pizzas.length}</b> <button className="btn btn-success number-of-pizzas-button" onClick={this.addPizza}><i className="fa fa-plus"></i></button>
          </div>
        </div>
        <div className="row">
            {pizzas.map((item, index) => {
              return (
                <div key={index} className="col-sm-12 col-md-6 py-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <div className="text-right">
                          <button className="btn btn-danger btn-sm" onClick={this.removePizza.bind(null, index)}><i className="fa fa-minus"></i></button>
                        </div>
                        <h2 className="">Pizza #{index + 1}</h2>
                      </div>
                      <h5 className="text-left">Escoge tus ingredientes:</h5>
                      <div className="row">
                        {Object.keys(INGREDIENTS).map((ingredient, id) => {
                          const isIngredientIncluded = pizzas[index].ingredients[ingredient];

                          return (
                            <div className="col-3" key={`ingredient-${index}-${ingredient}`}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value={isIngredientIncluded}
                                  checked={isIngredientIncluded}
                                  id={`check-${index}-${id}`}
                                  onChange={this.addIngredient.bind(null, index, ingredient)} />
                                  <label className="form-check-label" htmlFor={`check-${id}`}>
                                    {INGREDIENTS[ingredient]}
                                  </label>
                              </div>
                            </div>
                          );
                        })}

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    )
  }
};
export default PizzaMaker;
