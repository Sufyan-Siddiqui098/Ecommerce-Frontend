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
  const [answer, setAnswer] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = { name, email, password, phone, address, answer };
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

  document.title = 'Ecommerce App | Register'

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <h1 className="text-2xl mb-7 sm:text-3xl sm:mb-8 ">Register Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="name" className="hidden sm:block">Name</label>
          <input
            className="p-2 rounded-md border-[1px] border-gray-300"
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="emial" className="hidden sm:block">Email</label>
          <input
            className="p-2 rounded-md border-[1px] border-gray-300"
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
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
            placeholder="Type password here"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="phone" className="hidden sm:block">Phone</label>
          <input
            className="p-2 rounded-md border-[1px] border-gray-300"
            type="text"
            name="phone"
            id="phone"
            placeholder="Type phone here"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="address" className="hidden sm:block">Address</label>
          <textarea
            className="p-2 rounded-md border-[1px] border-gray-300"
            name="address"
            id="address"
            placeholder="Type Address here."
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        {/* Question to forget password */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
          <label htmlFor="address" className="hidden sm:block">Secret key</label>
          <input
          className="p-2 rounded-md border-[1px] border-gray-300"
            type= 'text'
            name="answer"
            id="answer"
            placeholder="Fav person | sports"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></input>
        </div>
        <button className="btn-submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
