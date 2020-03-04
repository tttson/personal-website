import React from 'react'
import {Link} from 'react-router-dom'
import { jsx, css } from '@emotion/core'

const QuickAccess = (props) => {
  const text = props.text
  const id = props.id
  const imgLink = props.img
  const ttl = props.ttl
  const userNum = props.userNum
  return (
    <div id={id} css={css`
    background-color: hotpink;
    `}>
        <Link to={`/${id}`}><img src={imgLink}/></Link>
        <p>{text}</p>
        {text === 'Total Orders'? <p>{ttl}</p> : null}
        {text === 'Total Customers'? <p>{userNum}</p> : null}
      </div>
    )
  }

export default QuickAccess
