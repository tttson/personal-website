import React, { Component } from 'react'

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

class AllProducts extends Component {
  constructor (props){
    super(props)
    this.state = {
      products: []
    }
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/customers/orders')
      const allOrders =  res.data
      this.setState({
        orders: products.orders
      })
    } catch (err){
    console.log('Something went wrong in getting all orders!', err)
    }
  }
}

export default AllProducts
