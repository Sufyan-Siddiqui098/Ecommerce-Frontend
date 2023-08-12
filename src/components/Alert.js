import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const msg = useSelector((state)=>state.user.message);
  const err = useSelector((state) => state.error)
  return (
    <div className={`msg ${err?"error":"success"}`}>
      <p>{msg}</p>
    </div>
  )
}

export default Alert