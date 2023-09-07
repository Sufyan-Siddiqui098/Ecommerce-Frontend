// import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
// import { checkUser } from '../store/UserSlice';

const Home = () => {
  const {userInfo , authToken} = useSelector((state)=>state.user)
  // const dispatch = useDispatch();
  
  // useEffect(()=>{
  //   dispatch(checkUser())
  //   console.log("checking user inside ")
  // },[])

  return (
    <div>Home
    {userInfo &&  <div>user: {userInfo.name}</div>}
     {authToken &&          <div>Auth token: {authToken}</div>}
    </div>
  )
}

export default Home