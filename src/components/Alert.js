import React from 'react'
import { useSelector } from 'react-redux'
import './alert.css'
import {MdOutlineDownloadDone} from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'

const Alert = () => {
  const {message, error, alert} = useSelector((state)=>state.user);
  
  return (
    <div className={`alert ${alert? "show":"hide"} ${error?"error":"success"}`}>
      <p className='dflex'>{error? <RxCross2 className='icon' /> : <MdOutlineDownloadDone className='icon'/>}{`${message}`}</p>
    </div>
  )
}

export default Alert