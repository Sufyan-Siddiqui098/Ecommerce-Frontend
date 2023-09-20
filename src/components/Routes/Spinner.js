import React, { useEffect, useState } from 'react'
import loading from './image/loadingSpinner.gif'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = (props) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prev)=> --prev);
        }, 1000)
        //Redirect to the path
        count===0 && navigate(props.path, {
            state: location.pathname
        })
        
        //call back to clear the interval
        return ()=> clearInterval(interval)
    }, [count, navigate, props.path, location])

  return (
    <div className='min-h-screen flex items-center flex-col justify-center p-2'>
        <h1 className='text-2xl text-center mb-5'>{props.message} in {count} seconds.</h1>
        <div className="">
            <img src={loading} alt="spinner" />
        </div>
    </div>
  )
}

export default Spinner