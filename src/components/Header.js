import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import {RxHamburgerMenu} from 'react-icons/rx'

const Header = () => {
  const navBar = useRef(null)
  const sideBar = useRef(null)
  const activeNavBar = ()=>{
    if(navBar.current.classList.contains('active')){
      navBar.current.classList.remove('active')
      sideBar.current.style.display= 'none'
    }
    else{
      sideBar.current.style.display = 'unset'
      navBar.current.classList.add('active')
    }
  }
  
  const deActiveNavBar = (e)=>{
    if(!e.target.classList.contains("active")){
      sideBar.current.style.display= 'none'
      navBar.current.classList.remove("active")
    }
  }
  
  return (
    <header>
          <Link to='/' className='link logo'>🛒 Ecommerce App</Link>
          <div className="sideBar" ref={sideBar} onClick={deActiveNavBar}>
          </div>
            <RxHamburgerMenu className='menu' onClick={activeNavBar}/>
        <nav ref={navBar}>
            <Link className='link' onClick={deActiveNavBar} to='/'>Home</Link>
            <Link className='link' onClick={deActiveNavBar} to='/category'>Category</Link>
            <Link className='link' onClick={deActiveNavBar} to='/register'>Register</Link>
            <Link className='link' onClick={deActiveNavBar} to='/login'>Login</Link>
            <Link className='link' onClick={deActiveNavBar} to='/cart'>Cart (0)</Link>

        </nav>
    </header>
  )
}

export default Header