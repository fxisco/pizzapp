import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ContactForm  from './ContactForm';
import PizzaMaker  from './PizzaMaker';
import Confirmation  from './Confirmation';
import { ORDER_STATUS, ORDER_TYPES, HOME_TYPES, STEPS } from '../conf/order';
import { createPizza } from '../helpers/pizza';
import { INGREDIENTS_PROPORTIONS } from '../conf/pizza';
import { database } from '../firebase';

const {
  CONTACT_FORM,
  CONFIRMATION,
  PIZZA_BUILDER
} = STEPS;

class Cart extends  Component {
  constructor(props) {
    super(props);

    this.orderRef = database.collection('orders');

    this.state = {
      step: CONTACT_FORM,
      name: '',
      street: '',
      number: '',
      instructions: '',
      typeOfHome: HOME_TYPES.HOUSE,
      telephone: '',
      pizzas: [],
    };

    this.goNextStep = this.goNextStep.bind(this);
    this.goPreviousStep = this.goPreviousStep.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPizza = this.addPizza.bind(this);
    this.removePizza = this.removePizza.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.setIngredientProportion = this.setIngredientProportion.bind(this);
    this.shouldShowButton = this.shouldShowButton.bind(this);
    this.handleEmitOrder = this.handleEmitOrder.bind(this);
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
              [ingredientId]: INGREDIENTS_PROPORTIONS.WHOLE
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

    if (previousStep < 1) {
      this.props.history.push('/');
    } else {
      this.setState({
        step: step - 1
      });
    }
  }

  goNextStep() {
    this.setState({
      step: this.state.step + 1
    })
  }

  shouldShowButton() {
    const { name, number, street, telephone, step, pizzas } = this.state;

    switch (step) {
      case CONTACT_FORM: {
        if (this.props.orderType === ORDER_TYPES.DELIVERY) {
          return name && number && street && telephone;
        }

        return name && telephone;
      }
      case PIZZA_BUILDER: {
        const pizzasWithIngredients = pizzas.filter((pizza) => Object.keys(pizza.ingredients).length > 0).length;

        return pizzas.length > 0 &&
          pizzasWithIngredients >= pizzas.length;
      }
      default:
        return false;
    }
  }

  handleEmitOrder() {
    const newRegistry = this.orderRef.doc();
    const { orderType } = this.props;
    const { name, number, street, telephone, step, pizzas } = this.state;

    this.orderRef.doc(newRegistry.id).set({
      id: newRegistry.id,
      orderType,
      name,
      number,
      street,
      telephone,
      pizzas,
      status: ORDER_STATUS.EMITTED
    }).then(() => {
      console.log('::orden colocada');
    });
  }

  render () {
    const {
      instructions,
      name,
      number,
      pizzas,
      step,
      street,
      telephone,
      typeOfHome,
    } = this.state;

    const { orderType } = this.props;

    return (
      <div className="container">
        <div className="card shadow-lg">
          <div className="card-header">
            <h2>Orden</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                {step === CONTACT_FORM &&
                  <ContactForm
                    name={name}
                    telephone={telephone}
                    number={number}
                    typeOfHome={typeOfHome}
                    street={street}
                    instructions={instructions}
                    orderType={orderType}
                    handleInputChange={this.handleInputChange}
                  />
                }
                {step === PIZZA_BUILDER &&
                  <PizzaMaker
                    pizzas={pizzas}
                    addIngredient={this.addIngredient}
                    removePizza={this.removePizza}
                    addPizza={this.addPizza}
                    setIngredientProportion={this.setIngredientProportion}
                  />
                }
                {step === CONFIRMATION &&
                  <Confirmation
                    address={{
                      name,
                      telephone,
                      instructions,
                      number,
                      typeOfHome,
                      street}}
                    orderType={orderType}
                    pizzas={pizzas}
                    handleEmitOrder={this.handleEmitOrder}
                  />
                }
              </div>
              <div className="col-12 px-4 pt-5 pb-3">
                <button className="btn btn-danger float-left" onClick={this.goPreviousStep}>Regresar</button>
                {
                  this.shouldShowButton() &&
                  <button className="btn btn-success float-right" onClick={this.goNextStep}>Siguiente</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Cart);
