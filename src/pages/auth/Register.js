import React, { useState } from "react";
import "../styles/register.css";
import { registerUser, switchAlert } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = { name, email, password, phone, address };
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const json = await response.json();
      console.log("json inside register handler ", json);
      dispatch(registerUser(json));
      if (json.success || json.message === "Already Registered please login") {
        navigate("/login");
      }

      // -------- HIDE ALERT MESSAGE
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2500);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="register">
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Type phone here"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            placeholder="Type Address here."
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
