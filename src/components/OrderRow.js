import React, { Component } from "react";

const OrderRow = props => {
  const eaOrder = props.rows;
  return (
    <tr>
      <td>{eaOrder.user_name}</td>
      <td>{eaOrder.user_id}</td>
      <td>{eaOrder.order_no}</td>
      <td>{eaOrder.item_count}</td>
    </tr>
  );
};

export default OrderRow;
