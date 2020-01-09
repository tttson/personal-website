import React from 'react'
import {Link} from 'react-router-dom'

const QuickAccess = (props) => {
  const text = props.text
  const id = props.id
  const imgLink = props.img
  console.log('in quickaccess', props)
  return (
      <div>
        <Link to={`/${id}`}><img src={imgLink}/></Link>
        <p>{text}</p>
      </div>
  )
}

export default QuickAccess
