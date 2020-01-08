import React, {Component} from 'react'
import SingleOrderRow from './SingleOrderRow'

const SingleOrderTable = (props) => {
  // console.log('single order table', props)
    const singleorder = props.orders
    const deleteOrderItem = props.deleteOrderItem
    const addOrderItem = props.addOrderItem
    const products = props.products
    return (
      <div>
        <div>
        <table>
          <tbody>
            <tr>
              <th>Row No.</th>
              <th>Order ID</th>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Delete Item</th>
            </tr>
              {
              singleorder.map((eaOrder, i) => (
                <SingleOrderRow key={i} rows={eaOrder} deleteOrderItem={deleteOrderItem}/>
              ))
              }
          </tbody>
        </table>
        </div>
      </div>
    )
}

export default SingleOrderTable
