import React, {Component} from 'react'
import OrderRow from './OrderRow'

const SingleTable = (props) => {
    const allorders = props.orders
    console.log('what is in singletable', props.orders)
    // const selectOrder = props.selectOrder
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
                <OrderRow rows={eaOrder} />
              ))
              }
          </tbody>
        </table>
    )
}

export default SingleTable
