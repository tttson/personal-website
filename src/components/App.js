import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import Landing from './Landing'
import Navbar from './Nav'
import UpdateOrders from './UpdateOrders'
import CreateOrder from './CreateOrder'
import AllProducts from './AllProducts'
import AllOrdersTable from './AllOrdersTable';

class App extends Component {
  render() {
    return (
        <div id='container'>
            <Route exact path="/" component={Navbar}/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/orders" component={AllOrdersTable}/>
            <Route exact path="/update" component={UpdateOrders}/>
            <Route exact path="/create" component={CreateOrder}/>
            <Route exact path="/catalog" component={AllProducts}/>
        </div>
    )
  }
}

export default App
