// import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
// import { checkUser } from '../store/UserSlice';

const Home = () => {
  const { userInfo, authToken } = useSelector((state) => state.user);

  // useEffect(()=>{
  //   dispatch(checkUser())
  //   console.log("checking user inside ")
  // },[])
  document.title = 'Ecommerce App | Home'

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl ">Home</h1>
      {userInfo && <div>user: {userInfo.name}</div>}
      {authToken && (
        <div className="flex flex-col items-center justify-center">
          <p>Auth token:</p>
          <p className="border-2 border-black overflow-scroll min-h-min w-[90vw]">
            {authToken}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
