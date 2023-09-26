import React, { useState } from "react";
import { forgetPassword, switchAlert } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const notAllow = !email || !password || !answer;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password, answer };
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-TYpe": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const json = await response.json();
      dispatch(forgetPassword(json));

      if (json.success) {
        navigate("/login");
      }
      // -------- HIDE ALERT MESSAGE
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    } catch (error) {
      console.log("error in login", error);
    }
  };

  document.title = 'Ecommerce App | Forget Password'

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Forget Password</h1>
      <form action="" className="flex flex-col gap-3 mt-4 justify-center items-center">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="border-[1px] border-gray-600 p-2 rounded-md"
          placeholder="Email"
        />
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          className="border-[1px] border-gray-600 p-2 rounded-md"
          placeholder="Secret Key"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="border-[1px] border-gray-600 p-2 rounded-md"
          placeholder="new password"
        />

        <button disabled={notAllow} onClick={resetPassword} className="bg-blue-600 p-2 rounded-md max-w-max text-white mt-2 disabled:opacity-60 disabled:cursor-not-allowed">Change Password</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
