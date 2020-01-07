import React, {Component} from 'react'

const UserOrder = (props) => {
  const eaOrder = props.rows
console.log('from OrderRows', props.rows)
    const allorders = props.orders
    const selectOrder = props.selectOrder
    return (
        <table>
          <tbody>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Order No.</th>
              <th>Product ID</th>
              <th>Product Name</th>
            </tr>
              {
              allorders.map(eaOrder => (
                <OrderRow rows={eaOrder} selectOrder={selectOrder}/>
              ))
              }
          </tbody>
        </table>
    )
}

export default UserOrder


