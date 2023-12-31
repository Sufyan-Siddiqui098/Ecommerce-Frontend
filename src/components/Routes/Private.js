import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'
import Spinner from './Spinner'

const PrivateRoute = () => {
    const [ok, setOk] = useState(false)

    const {authToken} = useSelector((state)=>state.user);

    useEffect(()=>{
        
        const authCheck = async () => {
            const res = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`,{
                method: "GET",
                headers: {
                    "Authorization": authToken
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
        console.log("private componnet running")

    },[authToken])
    
    return ok ? <Outlet/> : <Spinner message="Redirecting you" path='/login'/>
}

export default PrivateRoute;