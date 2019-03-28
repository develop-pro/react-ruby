import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Checkout, OrderComplete} from '.';

export default class Store extends Component {
  render() {
    return (
      <div style={{background: '#fff'}}>
        <Switch>
          <Route exact path='/employers/store/checkout' render={(props) => <Checkout {...props}/>}/>
          <Route exact path='/employers/store/order-complete' render={(props) => <OrderComplete {...props}/>}/>
        </Switch>
      </div>
    )
  }
}
