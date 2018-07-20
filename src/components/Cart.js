import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AddressForm  from './AddressForm';
import PizzaMaker  from './PizzaMaker';
import Confirmation  from './Confirmation';
import { ORDER_TYPES, HOME_TYPES, STEPS } from '../conf/order';
import { createPizza } from '../helpers/pizza';
import { INGREDIENTS_PROPORTIONS } from '../conf/pizza';

const {
  ADDRESS_FORM,
  CONFIRMATION,
  PICK_NUMBER_OF_PIZZAS
} = STEPS;

class Cart extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 2,
      // step: props.type === ORDER_TYPES.DELIVERY ? ADDRESS_FORM : PICK_NUMBER_OF_PIZZAS,
      typeOfHome: HOME_TYPES.HOUSE,
      street: '',
      number: '',
      instructions: '',
      pizzas: [
        {ingredients:{"VEGETABLES":true,"HAM":true}, ingredientsProportions:{VEGETABLES:"WHOLE","HAM":"RIGHT", PEPERRONI: "WHOLE"}, price: 100},{ingredients:{"PEPERRONI":true},ingredientsProportions:{PEPERRONI:"WHOLE"}, price: 100}
      ]
    };

    this.goNextStep = this.goNextStep.bind(this);
    this.goPreviousStep = this.goPreviousStep.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPizza = this.addPizza.bind(this);
    this.removePizza = this.removePizza.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.setIngredientProportion = this.setIngredientProportion.bind(this);
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
            },
            ingredientsProportions: {
              ...pizza.ingredientsProportions,
              [ingredientId]: INGREDIENTS_PROPORTIONS.LEFT
            },
          },
          ...pizzas.slice(pizzaId + 1),
        ]
      };
    } else {
      delete pizza.ingredients[ingredientId];
      delete pizza.ingredientsProportions[ingredientId];

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

  setIngredientProportion(value, pizzaId, ingredientId) {
    const { pizzas } = this.state;
    const pizza = pizzas[pizzaId];


    if (pizza.ingredientsProportions[ingredientId] !== value) {
      this.setState({
        pizzas: [
          ...pizzas.slice(0, pizzaId),
          {
            ...pizza,
            ingredientsProportions: {
              ...pizza.ingredientsProportions,
              [ingredientId]: value
            }
          },
          ...pizzas.slice(pizzaId + 1),
        ]
      });
    }
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  goPreviousStep() {
    const { step } = this.state;
    const previousStep = step - 1;

    if (previousStep < 0) {
      this.props.history.push('/');
    } else {
      this.setState({
        step: step - 1
      });
    }
  }

  goNextStep() {
    console.log(JSON.stringify(this.state.pizzas));
    this.setState({
      step: this.state.step + 1
    })
  }

  render () {
    const { number, pizzas, step, typeOfHome, street } = this.state;
    const backButtonText = step === 0 ? 'Volver a empezar' : 'Regresar';

    return (
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header">
            <h2>Orden</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                {step === ADDRESS_FORM &&
                  <AddressForm
                    number={number}
                    typeOfHome={typeOfHome}
                    street={street}
                    handleInputChange={this.handleInputChange}
                  />
                }
                {step === PICK_NUMBER_OF_PIZZAS &&
                  <PizzaMaker
                    pizzas={pizzas}
                    addIngredient={this.addIngredient}
                    removePizza={this.removePizza}
                    addPizza={this.addPizza}
                    setIngredientProportion={this.setIngredientProportion}
                  />
                }
                {step === CONFIRMATION &&
                  <Confirmation pizzas={pizzas}/>
                }
              </div>
              <div className="col-12 px-4 pt-5 pb-3">
                <button className="btn btn-danger float-left" onClick={this.goPreviousStep}>{backButtonText}</button>
                <button className="btn btn-success float-right" onClick={this.goNextStep}>Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Cart);
