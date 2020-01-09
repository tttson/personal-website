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
      content: [{id:'users',text:'Total Users' ,img:"/user.png"}, {id:'orders',text:'Total Orders',img:'/orders.png'}, {id:'catalog',text:'Catalog',img:'/catalog.png'}, {id:'freq',text:'Freqently Ordered Items', img:'/freq.png'}]
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

  render() {
    let content = this.state.content
    console.log('this.state.content', this.state.content)
    return (
      <div className='main'>
          <section className='quickaccess'>
            {
              content.map((block, i) => (
              <div id={block.id}><QuickAccess id={block.id} img={block.img} text={block.text}/></div>
              ))
            }
          </section>
          <section className='allorders'>
            <AllOrdersTable orders={this.state.orders}/>
          </section>
      </div>
    )
  }
}

export default Landing
