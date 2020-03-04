import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class OrdersItemized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/api/orders");
      const all = res.data;
      this.setState({
        orders: all.orders
      });
    } catch (err) {
      console.log("Something went wrong in getting all itemized orders!", err);
    }
  }

  render() {
    return (
      <div id="container">
        <div className="all-products">
          <h1>Order Detail Page</h1>
          <table>
            <tbody>
              <tr>
                <th>Order ID</th>
                <th>Item ID</th>
                <th>Item Name</th>
              </tr>
              {this.state.orders.map(order => (
                <tr>
                  <td>{order.order_id}</td>
                  <td>{order.item_id}</td>
                  <td>{order.item_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/">
            <button className="btn-white" style={{ width: 250 }}>
              GO BACK TO HOMEPAGE >>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default OrdersItemized;
