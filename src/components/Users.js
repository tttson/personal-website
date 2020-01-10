import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Users extends Component {
  constructor (props){
    super(props)
    this.state = {
      users: []
    }
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/customers')
      const all =  res.data
      this.setState({
        users: all.users
      })
    } catch (err){
    console.log('Something went wrong in getting all orders!', err)
    }
  }

  render(){
    return(
      <div id="container">
        <div className="all-products">
        <h1>Customer Info</h1>
        <table>
            <tbody>
              <tr>
                <th>Customer Name</th>
                <th>Customer ID</th>
              </tr>
                {
                this.state.users.map(user=>(
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                  </tr>))
                }
            </tbody>
          </table>
          <Link to="/"><button className="btn-white" style={{width:250}}>GO BACK TO HOMEPAGE >></button></Link>
          </div>
        </div>
    )
  }
}


export default Users
