import React, {Component} from 'react'

const OrderRow = (props) => {
  const eaOrder = props.rows
  const selectOrder = props.selectOrder
console.log('from OrderRows', props)
  return  (
    <tr onClick= {()=> selectOrder(eaOrder.user_id)}>
      <td>{eaOrder.user_name}</td>
      <td>{eaOrder.user_id}</td>
      <td>{eaOrder.order_no}</td>
      <td>{eaOrder.item_count}</td>
    </tr>
  )
}

export default OrderRow


