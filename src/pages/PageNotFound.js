import React from 'react'
import { Link } from 'react-router-dom'
import "./styles/pnf.css"
const PageNotFound = () => {
  return (
   <div className="pnf">
    <h1>404</h1>
    <p>Oops ! Page Not Found</p>
    <Link to='/'>Go Back</Link>
   </div>
  )
}

export default PageNotFound