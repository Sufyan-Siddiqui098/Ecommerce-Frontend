import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { loginUser, switchAlert } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCart } from "../../store/CartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    //Clear the localStorage to avoid multiple auth-token.
    document.title = 'Ecommerce App | Login'
    if(localStorage.length>0){
      localStorage.clear();
    }
  },[])

  const handleLogin = async (e) => {
    //reset the cart item 
    dispatch(resetCart());
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const json = await response.json();
      // Auth token is setted inside local storage.
      localStorage.setItem("auth", json.token)
      localStorage.setItem('user', JSON.stringify(json.user))
      dispatch(loginUser(json));

      if (json.success) {
        navigate(location.state ||"/");
      }
      // -------- HIDE ALERT MESSAGE
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="register">
      <form className="sm:!px-6 !py-[2em]" onSubmit={handleLogin}>
        <h1 className="text-2xl mb-7 sm:text-3xl sm:mb-8">Login Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="emial" className="hidden sm:block">Email</label>
          <input
            className="p-2 rounded-md border-[1px] border-gray-300"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="password" className="hidden sm:block">Password</label>
          <input
            className="p-2 rounded-md border-[1px] border-gray-300"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-submit">Login</button>
        <button type="button" className="text-md text-gray-600 hover:underline" onClick={()=>navigate('/forget-password')}>Forget Password</button>
      </form>
    </div>
  );
};

export default Login;
