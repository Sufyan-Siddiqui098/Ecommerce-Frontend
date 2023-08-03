import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  
  return (
    <header>
          <Link to='/' className='link logo'>Brands</Link>
        <nav>
            <Link className='link' to='/'>Home</Link>
            <Link className='link' to='/category'>Category</Link>
            <Link className='link' to='/register'>Register</Link>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/cart'>Cart(0)</Link>

        </nav>
    </header>
  )
}

export default Header