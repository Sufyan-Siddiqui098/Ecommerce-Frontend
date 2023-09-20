import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { loginUser, switchAlert } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    //Clear the localStorage to avoid multiple auth-token.
    if(localStorage.length>0){
      localStorage.clear();
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-TYpe": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      // console.log("response ", response)

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
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="emial">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Type password here"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
