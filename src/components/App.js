import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Navbar from "./Nav";
import UpdateOrders from "./UpdateOrders";
import CreateOrder from "./CreateOrder";
import AllProducts from "./AllProducts";
import Users from "./Users";
import OrdersItemized from "./OrdersItemized";
import Location from "./Location";

class App extends Component {
  render() {
    return (
      <div id="container">
        <Route exact path="/" component={Navbar} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/orders" component={OrdersItemized} />
        <Route exact path="/update" component={UpdateOrders} />
        <Route exact path="/create" component={CreateOrder} />
        <Route exact path="/catalog" component={AllProducts} />
        <Route exact path="/location" component={Location} />
      </div>
    );
  }
}

export default App;
