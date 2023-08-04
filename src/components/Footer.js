import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
       <p className='text'>Alright Reserved &copy; - Sufyan</p>
       <p className="footer-links">
          <Link className='footer-link' to='/about'>About</Link> | 
          <Link className='footer-link' to='/contact'>Contact</Link> |
          <Link className='footer-link' to='/policy'>Privacy Policy</Link>
       </p>
    </footer>
  )
}

export default Footer