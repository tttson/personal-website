import React, { useState, useEffect } from 'react';
import OrderRow from './OrderRow'
import axios from "axios";


const AllOrdersTable = (props) => {
    const allorders = props.orders
    const selectOrder = props.selectOrder

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get('/api/customers/orders')
        .then(res => {
          setOrders(res.data.orders);
          console.log('you got it', orders)
          setLoad(true)
        })
        .catch(err =>{
          setError(err.message);
          setLoad(true)
        })
      }, [])

    return (
      <table>
          <tbody>
            <tr>
              <th>Customer Name</th>
              <th>Customer ID</th>
              <th>Order No.</th>
              <th>Item Count</th>
            </tr>
              {
              allorders.map((eaOrder, i) => (
                <OrderRow key={i} rows={eaOrder} selectOrder={selectOrder}/>
              ))
              }
          </tbody>
      </table>
    )
}

export default AllOrdersTable
