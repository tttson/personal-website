import React, {Component} from 'react'
import OrderRow from './OrderRow'

const LandingTable = (props) => {
  console.log('landingtable', props)
    const allorders = props.orders
    const selectOrder = props.selectOrder
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
              allorders.map(eaOrder => (
                <OrderRow rows={eaOrder} selectOrder={selectOrder}/>
              ))
              }
          </tbody>
        </table>
    )
}

export default LandingTable
