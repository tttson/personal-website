import React, { Component } from "react";
import SingleOrderRow from "./SingleOrderRow";

const SingleOrderTable = props => {
  const singleorder = props.orders;
  const deleteOrderItem = props.deleteOrderItem;
  const itemsNotInOrder = props.itemsNotInOrder;
  const handleChange = props.handleChange;
  let combined = singleorder.concat(itemsNotInOrder);
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
              <th>Add Item</th>
            </tr>
            {combined.map((eaOrder, i) => (
              <SingleOrderRow
                handleChange={handleChange}
                key={i}
                rows={eaOrder}
                deleteOrderItem={deleteOrderItem}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default SingleOrderTable;
