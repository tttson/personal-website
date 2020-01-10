import React from 'react'
import {Link} from 'react-router-dom'

const QuickAccess = (props) => {
  const text = props.text
  const id = props.id
  const imgLink = props.img
  const ttl = props.ttl
  const userNum = props.userNum
  console.log('in quickaccess', props)
  return (
      <div>
        <Link to={`/${id}`}><img src={imgLink}/></Link>
        <p>{text}</p>
        {text === 'Total Orders'? ttl : null}
        {text === 'Total Customers'? userNum : null}
      </div>
    )
  }

export default QuickAccess
