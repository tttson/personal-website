import React, { Component } from 'react'
import Confirmation from './Confirmation'
import Form from './Form'
import SingleOrderTable from './SingleOrderTable';
import axios from 'axios'
import {Link} from 'react-router-dom'

const PRODUCTS = ['Banana','Apples','Lettuce','Milk','Soda','Cereal','Chips','Eggs','Bread','Carrots']

const itemID = {
  'Banana': 1,
  'Apples': 2,
  'Lettuce': 3,
  'Milk': 4,
  'Soda': 5,
  'Cereal': 6,
  'Chips': 7,
  'Eggs': 8,
  'Bread': 9,
  'Carrots': 10
}

class UpdateOrders extends Component {
  constructor (props){
    super(props)
    this.state = {
      itemsNotInOrder: [],
      removed: [],
      orders: [],
      id: '',
      orderupdated: {},
      deleted: false,
      checkboxes: PRODUCTS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      )
    }
  }
  //checkbox handleChange
  handleChange = event => {
    const { name } = event.target
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }))
  }


  getOrderId = async (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    const res = await axios.get(`/api/orders/${this.state.id}`)
    const allOrders =  res.data
    let filtered = []
    let currOrder = this.itemNumsOnly(allOrders.orders)
    for (let itemName in itemID){
      if(!currOrder.includes(itemID[itemName])){
        filtered.push({item_name: itemName, item_id: itemID[itemName]})
      }
    }
    allOrders.orders.concat(filtered).forEach((order,i)=> order.rowId =  i+1)
    this.setState({
      orders: allOrders.orders,
      itemsNotInOrder: filtered
    })
  }

  counter = () => {
    let lastNum = this.state.orders[this.state.orders.length-1].rowId
   return lastNum
  }

  deleteOrderItem = async (rowId, itemId) => {
    await this.setState({
      orders: this.state.orders.filter(item => item.rowId !== rowId),
      removed: [...this.state.removed, itemId]
    })
  }


  itemNumsOnly = (arr) => {
    let list = []
    arr.forEach(obj => {
      list.push(obj.item_id)
    })
    return list
  }

  submitUpdatedOrder = async ()=> {
    event.preventDefault()
    let orderitems = []
    Object.keys(this.state.checkboxes)
    .filter(checkbox => this.state.checkboxes[checkbox])
    .forEach(checkbox => {
      orderitems.push(itemID[checkbox])
    })
    let newlyRemoved
    if (this.state.removed.length > 0) {
      newlyRemoved = this.state.removed
    }
    let updates = { add: orderitems, remove: newlyRemoved}
    const res = await axios.put(`/api/orders/${this.state.id}`,updates)
    this.setState({
      orderupdated: res.data
    })
  }

  submitDeleteOrder = async ()  => {
    const res = await axios.delete(`/api/orders/${this.state.id}`)
    let orderID = this.state.id
    this.setState({
      orders: [],
      deleted: true
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
      <div className="update-order">
      <h1>Update/Delete Existing Order Form</h1>
      <p>Step 1: Please enter the order ID and click submit.</p>
      <Form type='Order' id={this.state.id} handleFormChange={this.handleFormChange}/>
      <br></br>

      {
        this.state.orders.length ?
        <SingleOrderTable orders={this.state.orders} itemsNotInOrder={this.state.itemsNotInOrder} handleChange={this.handleChange} deleteOrderItem={this.deleteOrderItem} addOrderItem={this.addOrderItem}/> :
        <button className="btn-white" style={{width:150}} type="submit" onClick={this.getOrderId}>submit Order ID</button>
      }
      <p>Step 2: Please see above for order details. Please add items to your order using the check box and remove using the 'X' button.</p>
      <div>
      <p>Step 3: Please click submit or delete when you are ready to submit changes to your order.</p>
      <button className="btn-white" style={{width:250}}  onClick = {() => this.submitUpdatedOrder()}>SUBMIT UPDATED ORDER</button>
      <button className="btn-red" onClick = {() => this.submitDeleteOrder()}>DELETE ENTIRE ORDER</button>
      </div>

      {this.state.orderupdated.id? <Link to="/"><Confirmation action='updated' orderId={this.state.orderupdated.id}/></Link> : null}

      {this.state.deleted? <Link to="/"><Confirmation action='deleted' orderId={this.state.id}/></Link> :null}
      <br></br>
      <Link to="/"><button className="btn-white" style={{width:250}}>GO BACK TO HOMEPAGE >></button></Link>
      </div>
      </div>
    )
  }
}

export default UpdateOrders
