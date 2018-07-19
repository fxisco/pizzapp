import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch
} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './App.css';
import OrderTypePicker from './components/OrderTypePicker';
import Cart from './components/Cart';
import { ROUTES } from './conf/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderType: '',
    };

    this.handleOrderTypeSelect = this.handleOrderTypeSelect.bind(this);
  }

  handleOrderTypeSelect(type) {
    this.setState({
      orderType: type
    });

    this.props.history.push('order');
  }

  render() {
    const { orderType } = this.state;

    return (
      <div className="App">
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to={ROUTES.HOME}>Pizzería</Link>
            </div>
          </nav>
        </header>
        <main className="py-5">
          <Switch>
            <Route exact path="/" render={() => (
               <OrderTypePicker
                 handleTypePick={this.handleOrderTypeSelect}
               />
            )}/>
            <Route exact path="/order" component={() => (
              <Cart type={orderType} />
            )}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
