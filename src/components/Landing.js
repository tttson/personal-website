import React, { Component } from 'react'
import QuickAccess from './QuickAccess'
import axios from 'axios'
// import UserOrder from './UserOrder'
import AllOrdersTable from './AllOrdersTable'

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

  //use this for delete entire order
  removeOrderItem = async (orderItem) => {
    const orderItemId = orderItem.id
    const orders = this.state.orders
    const filtered = orders.filter(item => item.id !== orderItemId)
    await axios.delete(`/api/orders/${orderItemId}`)
    this.setState({
      orders: filtered
    })
  }

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
          <section className='allorders'>
              <AllOrdersTable orders={this.state.orders}/>
          </section>
      </div>
    )
  }
}

export default Landing
