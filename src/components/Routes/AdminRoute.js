import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'
import Spinner from './Spinner'

const AdminRoute = () => {
    const [ok, setOk] = useState(false)

    const {authToken} = useSelector((state)=>state.user);

    useEffect(()=>{
        
        const authCheck = async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authToken,
                }
            })

            const json = await res.json()
            if(json.ok){
                setOk(true)
            } else {
                setOk(false)
            }
        }

        if(authToken!== ''){
            authCheck();
        }
        console.log("admin private route componnet running")

    },[authToken])
    
    return ok ? <Outlet/> : <Spinner message="Redirecting you" path='/'/>
}

export default AdminRoute;