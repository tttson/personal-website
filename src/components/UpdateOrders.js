import React, { Component } from 'react'
import Checkbox from './Checkbox'
import Confirmation from './Confirmation'
import Form from './Form'
import SingleOrderTable from './SingleOrderTable';
import axios from 'axios'

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
      added: [],
      removed: [],
      orders: [],
      id: '',
      orderupdated: {},
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
    console.log('checkbox changes', this.state.checkboxes)
  }


  getOrderId = async (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    const res = await axios.get(`/api/orders/${this.state.id}`)
    const allOrders =  res.data
    const items = {
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
    let filtered = []
    let currOrder = this.itemNumsOnly(allOrders.orders)
    for (let itemName in items){
      if(!currOrder.includes(items[itemName])){
        filtered.push({item_name: itemName, item_id: items[itemName]})
      }
    }
    allOrders.orders.concat(filtered).forEach((order,i)=> order.rowId =  i+1)
    this.setState({
      orders: allOrders.orders,
      itemsNotInOrder: filtered
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

  submitUpdatedOrder = async ()=> {
    event.preventDefault()
    let orderitems = []
    Object.keys(this.state.checkboxes)
    .filter(checkbox => this.state.checkboxes[checkbox])
    .forEach(checkbox => {
      orderitems.push(itemID[checkbox])
      console.log(orderitems, 'in cart')
    })
    const info = { items: orderitems, removed: this.state.removed}
    console.log('added items to order', orderitems)
let newlyRemoved
    if (this.state.removed.length > 0) {
      newlyRemoved = this.state.removed
    }
    let updates = { add: orderitems, remove: newlyRemoved}
    const res = await axios.put(`/api/orders/${this.state.id}`,updates)
    this.setState({
      orderupdated: res.data
    })
    console.log('SUCCESS WE ADDED IN PUT ROUTE')
  }

  deleteOrder = ()  => {

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

      {
        this.state.orders.length ?
        <SingleOrderTable orders={this.state.orders} itemsNotInOrder={this.state.itemsNotInOrder} handleChange={this.handleChange} deleteOrderItem={this.deleteOrderItem} addOrderItem={this.addOrderItem}/> :
        null
      }

      <div>
      <button onClick = {() => this.submitUpdatedOrder()}>SUBMIT UPDATED ORDER</button>
      <button onClick = {() => this.deleteOrder()}>DELETE ENTIRE ORDER</button>
      </div>

      {this.state.orderupdated.id? <Confirmation action='updated' orderId={this.state.orderupdated.id}/> : null}
      </div>
    )
  }
}

export default UpdateOrders
