import React, { Component } from "react";
import QuickAccess from "./QuickAccess";
import axios from "axios";
// import UserOrder from './UserOrder'
import AllOrdersTable from "./AllOrdersTable";


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      users: [],
      content: [
        { id: "users", text: "Total Customers", img: "/user.png" },
        { id: "orders", text: "Total Orders", img: "/orders.png" },
        { id: "catalog", text: "Catalog", img: "/catalog.png" },
        { id: "location", text: "Geo Location", img: "/location.png" }
      ]
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/api/customers/orders");
      const resUsers = await axios.get("/api/customers");
      const allOrders = res.data;
      this.setState({
        users: resUsers.data.users,
        orders: allOrders.orders
      });
    } catch (err) {
      console.log("Something went wrong in getting all orders!", err);
    }
  }


  render() {
    let content = this.state.content;
    return (
      <div className="main">
        <section className="quickaccess">
          {content.map((block) => (
            <QuickAccess
              key={block.id}
              id={block.id}
              img={block.img}
              text={block.text}
              userNum={this.state.users.length}
              ttl={this.state.orders.length}
            />
          ))}
        </section>
        <section className="allorders">
          <AllOrdersTable orders={this.state.orders} />
        </section>
      </div>
    );
  }
}

export default Landing;
