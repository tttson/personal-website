import React, {Component} from 'react'

const SingleOrderRow = (props) => {
  const eaOrder = props.rows
  const deleteOrderItem = props.deleteOrderItem
// console.log('from OrderRows', props)
  return  (
    // <tr onClick = {() => deleteOrderItem(eaOrder.id)}>
    <tr>
      <td>{eaOrder.rowId}</td>
      <td>{eaOrder.order_id}</td>
      <td>{eaOrder.item_id}</td>
      <td>{eaOrder.item_name}</td>
      <td><button onClick = {() => deleteOrderItem(eaOrder.rowId,eaOrder.item_id)}>X</button></td>
    </tr>
  )
}

export default SingleOrderRow


