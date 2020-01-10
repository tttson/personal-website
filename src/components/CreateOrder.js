import React, { Component } from 'react'
import Checkbox from './Checkbox'
import Form from './Form'
import axios from 'axios'
import Confirmation from './Confirmation'
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

class CreateOrder extends Component {
  constructor (props){
    super(props)
    this.state = {
      ordercreated: {},
      id:'',
      checkboxes: PRODUCTS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      )
    }
  }

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }))
    })
  }

  selectAll = () => this.selectAllCheckboxes(true)

  deselectAll = () => this.selectAllCheckboxes(false)

  handleChange = event => {
    const { name } = event.target
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }))
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    let orderitems = []
    Object.keys(this.state.checkboxes)
    .filter(checkbox => this.state.checkboxes[checkbox])
    .forEach(checkbox => {
      orderitems.push(itemID[checkbox])
      console.log(orderitems, 'in cart')
    })
    const info = { items: orderitems, userid: this.state.id}
    console.log('being sent to backend', info)
    let res = await axios.post('/api/orders', info)
    console.log('res from  post route', res.data)
    this.setState({
      id: "",
      ordercreated: res.data
    })
    this.deselectAll()
  }

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleChange}
      key={option}
    />
  )

  createCheckboxes = () => PRODUCTS.map(this.createCheckbox)


  handleFormChange =(event) => {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="create-order">
        <h1>Create New Order Form</h1>
            <form onSubmit={this.handleSubmit}>
            <p>Step 1: Please enter the customer ID.</p>
            <Form type='Customer' id={this.state.id} handleFormChange={this.handleFormChange}/>
            <br></br>
            <p>Step 2: Please select items to place in order.</p>
              {this.createCheckboxes()}
                <button
                  type="button"
                  className="btn-white"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn-white"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <div>
                <p>Step 3: Please click SAVE to place order.</p>
                <button type="submit" disabled={!this.state.id} className="btn-blue">
                  Save
                </button>
              </div>
            </form>

            {this.state.ordercreated.id? <Link to="/"><Confirmation action='created' orderId={this.state.ordercreated.id}/></Link> : null}
            <br></br>
            <Link to="/"><button className="btn-white" style={{width:250}}>GO BACK TO HOMEPAGE >></button></Link>
          </div>
      </div>
    )
  }
}

export default CreateOrder
