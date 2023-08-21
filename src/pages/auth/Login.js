import React,{useState} from 'react';
import '../styles/register.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {email, password}
        console.log("On Login submit ", user)
        //  dispatch(registerUser(user))
        //  navigate("/login")
        //  setTimeout(() => {
        //   dispatch(switchAlert())
        //  }, 2000);
        //  console.log("inside form submit function ",user)
      }

  return (
    <div className='register'>
    <h1>Login Page</h1>
    <form onSubmit={handleSubmit}>
        
      <div className="field">
        <label htmlFor="emial">Email</label>
        <input type="email" name="email" id="email" placeholder='example@gmail.com' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder='Type password here' required value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      
      
      <button className='btn-submit'>Login</button>
    </form>
</div>
  )
}

export default Login