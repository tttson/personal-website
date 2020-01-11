import React, {Component} from 'react'
import Checkbox from './Checkbox';

const SingleOrderRow = (props) => {
  const eaOrder = props.rows
  const deleteOrderItem = props.deleteOrderItem
  const handleChange = props.handleChange
  return  (
    <tr>
      <td>{eaOrder.rowId}</td>
      <td>{eaOrder.order_id}</td>
      <td>{eaOrder.item_id}</td>
      <td>{eaOrder.item_name}</td>
      <td>
        {
          eaOrder.order_id?
          <button onClick = {() => deleteOrderItem(eaOrder.rowId,eaOrder.item_id)}>
          X
          </button>
          : null
        }
        </td>
      <td>{eaOrder.order_id? null: <Checkbox label={eaOrder.item_name} onCheckboxChange={handleChange}/>}</td>
    </tr>
  )
}

export default SingleOrderRow


