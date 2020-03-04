import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="navbar">
      <img src="/logo.png" alt="logo" />
      <ul>
        <Link to="/create">
          <li>Create New Order</li>
        </Link>
        <Link to="/update">
          <li>Update Existing Order</li>
        </Link>
        <Link to="/catalog">
          <li>Product Catalog</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
