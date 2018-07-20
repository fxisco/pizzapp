import React from 'react';
import { INGREDIENTS } from '../conf/constants';
import { INGREDIENTS_PROPORTIONS } from '../conf/pizza';

const PizzaMaker = ({
  pizzas = [],
  addPizza = () => {},
  addIngredient = () => {},
  removePizza = () => {},
  setIngredientProportion = () => {},
}) => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        Número de pizzas: <b className="number-of-pizzas align-middle">{pizzas.length}</b> <button className="btn btn-success number-of-pizzas-button" onClick={addPizza}><i className="fa fa-plus"></i></button>
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
                    <button className="btn btn-danger btn-sm" onClick={removePizza.bind(null, index)}><i className="fa fa-minus"></i></button>
                  </div>
                  <h2 className="">Pizza #{index + 1}</h2>
                </div>
                <h5 className="text-left">Escoge tus ingredientes:</h5>
                <div className="row">
                  {Object.keys(INGREDIENTS).map((ingredient, id) => {
                    const isIngredientIncluded = !!pizzas[index].ingredients[ingredient];
                    const ingredientProportion = pizzas[index].ingredientsProportions[ingredient];

                    return (
                      <div className="col-sm-12 col-md-4 text-left mb-4" key={`ingredient-${index}-${ingredient}`}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isIngredientIncluded}
                            id={`check-${index}-${id}`}
                            onChange={addIngredient.bind(null, index, ingredient)} />
                          <label className="form-check-label" htmlFor={`check-${index}-${id}`}>
                            {INGREDIENTS[ingredient]}
                          </label>
                          {isIngredientIncluded &&
                          <div className="size-container">
                            <input
                              className="proportion"
                              type="radio"
                              name={`proportion-${index}-${ingredient}`}
                              id={`proportion-lef-${index}-${ingredient}`}
                              checked={ingredientProportion === INGREDIENTS_PROPORTIONS.LEFT}
                              onChange={setIngredientProportion.bind(null, INGREDIENTS_PROPORTIONS.LEFT, index, ingredient)}
                            />
                            <label className="form-check-label" htmlFor={`proportion-lef-${index}-${ingredient}`} title="Ingrediente a la izquierda">
                              <i className="fa fa-adjust half-left fa-2x px-1" />
                            </label>
                            <input
                              className="proportion"
                              type="radio"
                              name={`proportion-${index}-${ingredient}`}
                              id={`proportion-whole-${index}-${ingredient}`}
                              checked={ingredientProportion === INGREDIENTS_PROPORTIONS.WHOLE}
                              onChange={setIngredientProportion.bind(null, INGREDIENTS_PROPORTIONS.WHOLE, index, ingredient)}
                            />
                            <label className="form-check-label" htmlFor={`proportion-whole-${index}-${ingredient}`} title="Ingrediente en toda la pizza">
                              <i className="fa fa-circle fa-2x px-1" />
                            </label>
                            <input
                              className="proportion"
                              type="radio"
                              name={`proportion-${index}-${ingredient}`}
                              id={`proportion-right-${index}-${ingredient}`}
                              checked={ingredientProportion === INGREDIENTS_PROPORTIONS.RIGHT}
                              onChange={setIngredientProportion.bind(null, INGREDIENTS_PROPORTIONS.RIGHT, index, ingredient)}
                            />
                            <label className="form-check-label" htmlFor={`proportion-right-${index}-${ingredient}`} title="Ingrediente a la derecha">
                              <i className="fa fa-adjust fa-2x px-1" />
                            </label>
                          </div>
                          }
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

export default PizzaMaker;
