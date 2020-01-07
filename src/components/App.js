import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Landing from './Landing';
import Navbar from './Nav';
import UpdateOrders from './UpdateOrders'
import CreateOrder from './CreateOrder'


class App extends Component {
  render() {
    return (
        <div id='container'>
            <Route path="/" component={Navbar}/>
            <Route path="/" component={Landing}/>
            {/* <Route path="/"render={()=> <Landing orders={this.state.orders} />}/> */}
            {/* <Route exact path='/orders/:orderId' component={SingleOrder
            } />
            <Route exact path="/update" component={UpdateOrders}/>
            <Route exact path="/create" component={CreateOrder}/> */}
        </div>
    );
  }
}

export default App;
