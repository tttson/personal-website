import React from "react"

const Confirmation = ({ action,orderId }) => (
  <div>
    <p>Order number {orderId} has been {action}.</p>
  </div>
)
export default Confirmation
