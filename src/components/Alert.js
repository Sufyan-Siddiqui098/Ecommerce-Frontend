import React from 'react'
import { useSelector } from 'react-redux'
import './alert.css'

const Alert = () => {
  const {message, error, alert} = useSelector((state)=>state.user);
  
  return (
    <div className={`alert ${alert? "show":"hide"} ${error?"error":"success"}`}>
      <p className='dflex'>{error? "❌" : "✔️"}{`${message}`}</p>
    </div>
  )
}

export default Alert