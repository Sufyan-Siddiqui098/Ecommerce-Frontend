import React, { useState } from 'react'
import "../styles/register.css"

const Register = () => {
  const [name, setName ] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='register'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder='name' required value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="field">
            <label htmlFor="emial">Email</label>
            <input type="email" name="email" id="email" placeholder='example@gmail.com' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='Type password here' required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea name="address" id="address" required value={address}  onChange={(e)=>setAddress(e.target.value)}></textarea>
          </div>
          <button className='btn-submit'>Register</button>
        </form>
    </div>
  )
}

export default Register