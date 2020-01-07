import React, {Component} from 'react'

const OrderRow = (props) => {
  const eaOrder = props.rows
console.log('from OrderRows', props.rows)
  return  (
  // <tr onClick= {()=> selectOrder(eaOrder.order_no)}>
<tr>
<td>{eaOrder.user_name}</td>
<td>{eaOrder.user_id}</td>
<td>{eaOrder.order_no}</td>
<td>{eaOrder.item_count}</td>
</tr>
  )
}

export default OrderRow


