import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div id='navbar'>
    <ul>
    <li><img src="/logo.png" alt="logo"/></li>
      <Link to="/create"><li>Create New Order</li></Link>
      <Link to="/update"><li>Update Existing Order</li></Link>
      <Link to="/catalog"><li>Product Catalog</li></Link>
    </ul>
    </div>
  )
}

export default Navbar
