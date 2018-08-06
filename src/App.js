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
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';
import { ROUTES } from './conf/routes';
import { database } from './firebase';
import { NAME } from './conf/constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.confRef = database.collection('app').doc('conf');
    this.state = {
      orderType: '',
      pizzaPrize: 0,
      name: ''
    };

    this.handleOrderTypeSelect = this.handleOrderTypeSelect.bind(this);
  }

  componentDidMount() {
    this.confRef.get().then((doc) => {
      const { price = 0, name = NAME } = doc.data();

      this.setState({
        pizzaPrize: price,
        name
      });
    });
  }

  handleOrderTypeSelect(type) {
    this.setState({
      orderType: type
    });

    this.props.history.push('order');
  }

  render() {
    const { name, orderType, pizzaPrize } = this.state;

    return (
      <div className="App">
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to={ROUTES.HOME} dangerouslySetInnerHTML={{__html: name || '&nbsp' }} />
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
            <Route exact path="/orders" component={Orders}/>
            <Route exact path="/order" component={() => (
              <Cart orderType={orderType} price={pizzaPrize} />
            )}/>
            <Route exact path="/order/:id" component={(props) => <OrderDetails {...props} price={pizzaPrize} />} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
