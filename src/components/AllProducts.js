import React, { Component } from 'react'
import axios from 'axios'

class AllProducts extends Component {
  constructor (props){
    super(props)
    this.state = {
      products: []
    }
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/products')
      const all =  res.data
      this.setState({
        products: all.products
      })
    } catch (err){
    console.log('Something went wrong in getting all orders!', err)
    }
  }

  render(){
    return(
      <div id="container">
        <div className="all-products">
        <h1>Product Catalog</h1>
          <table>
            <tbody>
              <tr>
                <th>Product Name</th>
                <th>Product ID</th>
              </tr>
                {
                this.state.products.map(item=>(
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>))
                }
            </tbody>
          </table>
          </div>
        </div>
    )
  }
}


export default AllProducts
