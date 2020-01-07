import React, { Component } from 'react';
import QuickAccess from './QuickAccess';
import axios from 'axios'
import UserOrder from './UserOrder';
import LandingTable from './LandingTable';

class Landing extends Component {
    constructor(props){
    super(props)
    this.state = {
      orders: [],
      selectedOrder: {}
    }
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/customers/orders')
      const allOrders =  res.data
      this.setState({
        orders: allOrders.orders
      })
    } catch (err){
    console.log('Something went wrong in getting all orders!', err)
    }
  }

  selectOrder = async (userId) => {
    try {
      const res = await axios.get(`/api/customers/${userId}/orders`)
      this.setState({
        selectedOrder: res.data
      })
    } catch (err) {
      console.log('Something went wrong in getting selected order!', err)
    }
  }
  //addToOrder function
  //updateOrder function
  //deleteOrder function

  render() {
    console.log('what is in my state in Landing', this.state.orders)
    return (
      <div className='main'>
          <section className='quickaccess'>
              <QuickAccess/>
              <QuickAccess/>
              <QuickAccess/>
              <QuickAccess/>
          </section>
          <section className='landingtable'>
          {
              this.state.selectedOrder.id ?
              <UserOrder userorder={this.state.selectedOrder}/> :
              <LandingTable orders={this.state.orders} selectOrder={this.selectOrder}/>
          }
          </section>
      </div>
    )
  }
}

export default Landing
