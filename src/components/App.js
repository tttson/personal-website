import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import Landing from './Landing'
import Navbar from './Nav'
import UpdateOrders from './UpdateOrders'
import CreateOrder from './CreateOrder'
import NotFound from './NotFound'

class App extends Component {
  render() {
    return (
        <div id='container'>
            <Route exact path="/" component={Navbar}/>
            <Route exact path="/" component={Landing}/>

            <Route exact path="/update" component={UpdateOrders}/>
                        {/* <Route exact path='/update/:orderId' component={SingleOrder}/> */}
            <Route exact path="/create" component={CreateOrder}/>
            {/* <Route path="*" component={NotFound} /> */}
        </div>
    )
  }
}

export default App
