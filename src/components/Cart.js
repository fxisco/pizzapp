import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AddressForm  from './AddressForm';
import PizzaMaker  from './PizzaMaker';
import { ORDER_TYPES, HOME_TYPES, STEPS } from '../conf/order';

const { ADDRESS_FORM, PICK_NUMBER_OF_PIZZAS } = STEPS;

class Cart extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      step: props.type === ORDER_TYPES.DELIVERY ? ADDRESS_FORM : PICK_NUMBER_OF_PIZZAS,
      typeOfHome: HOME_TYPES.HOUSE,
      street: '',
      number: '',
      instructions: ''
    };

    this.goNextStep = this.goNextStep.bind(this);
    this.goPreviousStep = this.goPreviousStep.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.setState({
      step: this.state.step + 1
    })
  }

  render () {
    const { instructions, number, step, typeOfHome, street } = this.state;
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
                  <PizzaMaker />
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
