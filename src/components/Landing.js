import React, { Component } from 'react';
import SingleTable from './SingleTable'
import QuickAccess from './QuickAccess';
import axios from 'axios'

class Landing extends Component {
    constructor(props){
    super(props)
    this.state = {
      orders: []
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

  selectOrder = async (orderId) => {
    try {
      const res = await axios.get(`/api/customers/${orderId}`)
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
          {/* <section className='quickaccess'>
              <QuickAccess/>
              <QuickAccess/>
              <QuickAccess/>
              <QuickAccess/>
          </section> */}
          <section className='singletable'>
              <SingleTable orders={this.state.orders}/>
          </section>
      </div>
    )
  }
}

export default Landing
