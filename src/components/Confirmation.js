import React from "react"


const Confirmation = ({ action,orderId }) => (
  <div className="confirmation">
    <p>Order number {orderId} has been {action}.</p>
    <p>Go Back To Dashboard To See Updates</p>
  </div>
)
export default Confirmation
