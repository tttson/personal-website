import React, { Component } from 'react'
import CreateOrder from './CreateOrder'
import Confirmation from './Confirmation'
import Form from './Form'
import SingleOrderTable from './SingleOrderTable';
import axios from 'axios'

class UpdateOrders extends Component {
  constructor (props){
    super(props)
    this.state = {
      products: [],
      added: [],
      removed: [],
      orders: [],
      id: '',
      orderupdated: {},
    }
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/products')
      const allprod =  res.data
      this.setState({
        products: allprod.products
      })
    } catch (err){
    console.log('Something went wrong in getting all orders!', err)
    }
  }


  getOrderId = async (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    const res = await axios.get(`/api/orders/${this.state.id}`)
    const allOrders =  res.data
    allOrders.orders.forEach((order,i)=> order.rowId =  i+1)
    this.setState({
      orders: allOrders.orders
    })
    console.log('id set to state', this.state)
  }

  counter = () => {
    let lastNum = this.state.orders[this.state.orders.length-1].rowId
   return lastNum
  }

  deleteOrderItem = async (rowId, itemId) => {
    await this.setState({
      orders: this.state.orders.filter(item => item.rowId !== rowId)
    })

    let idx = this.state.added.indexOf(itemId)
    if(idx === -1 || this.state.added.length === 0){
      this.state.removed.push(itemId)
    } else {
      let idx = this.state.added.indexOf(itemId)
      this.state.added.splice(idx,1)
    }
    console.log('in removed:', this.state.removed)
    console.log('in added:',  this.state.added)
  }

  itemNumsOnly = (arr) => {
    let list = []
    arr.forEach(obj => {
      list.push(obj.item_id)
    })
    return list
  }
  addOrderItem (item) {
    this.state.added.push(item.id)
    console.log('just added to my added list', this.state.added)
    let id = this.counter() + 1
    let addOrderID = {
      order_id: this.state.id,
      item_id: item.id,
      item_name: item.name,
      rowId: id
    }
    this.setState({
      orders: [...this.state.orders, addOrderID]
    })
  }

  submitUpdatedOrder = async ()=> {
    let newlyAdded
    let newlyRemoved
    if (this.state.added.length > 0) {
      newlyAdded = this.state.added
    }
    if (this.state.removed.length > 0) {
      newlyRemoved = this.state.removed
    }
    let updates = { add: newlyAdded, remove: newlyRemoved}
    // let test = {msg: 'this is a test'}
    const res = await axios.put(`/api/orders/${this.state.id}`,updates)
    this.setState({
      orderupdated: res.data
    })
  }

  handleFormChange =(event) => {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
      <Form type='Order' id={this.state.id} handleFormChange={this.handleFormChange}/>
      <button type="submit" onClick={this.getOrderId}>Submit Order ID</button>
      {this.state.orders.length? <SingleOrderTable orders={this.state.orders}  products={this.state.products} deleteOrderItem={this.deleteOrderItem} addOrderItem={this.addOrderItem}/>: null }
      <div>
        <table>
          <tbody>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Add Item</th>
            </tr>
            {
              this.state.products.map(eaproduct  => {
                return (
                <tr>
                <td>{eaproduct.id}</td>
                <td>{eaproduct.name}</td>
                <td><button onClick = {() => this.addOrderItem(eaproduct)}>+</button></td>
              </tr>
                )
              })
            }
          </tbody>
      </table>
      <button onClick = {() => this.submitUpdatedOrder()}>SUBMIT FINAL ORDER</button>
      </div>



      {this.state.orderupdated.id? <Confirmation action='updated' orderId={this.state.orderupdated.id}/> : null}
      </div>
    )
  }
}

export default UpdateOrders
