import React from 'react'
import {BsTelephone} from 'react-icons/bs'
import {HiOutlineMail} from 'react-icons/hi'
import "./styles/contact.css"

const ContactUs = () => {
  document.title = 'Ecommerce App | Conotact'
  return (
    <div className='contact-container'>
      <div className="left">
        <img src="https://www.repricerexpress.com/wp-content/uploads/2019/10/ecommerce-customer-service.jpg" alt="" />
      </div>
      <div className="right">
        <h2 className='title'>CONTACT US</h2>
          <p className='text'>Need any help? Feel free to contact anytime.</p>
          <a className='link contact-link' href="mailto:help@customersupoort.com"><HiOutlineMail/> : <p className="link-text">help@customersupoort.com</p></a>
          <a className='link contact-link' href="tel:+012-1234542"><BsTelephone/> : <p className="link-text">+012-1234542</p></a>
      </div>
    </div>
  )
}

export default ContactUs