import React from 'react'
import OrderRow from './OrderRow'

const AllOrdersTable = (props) => {
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
              allorders.map((eaOrder, i) => (
                <OrderRow key={i} rows={eaOrder} selectOrder={selectOrder}/>
              ))
              }
          </tbody>
      </table>
    )
}

export default AllOrdersTable
