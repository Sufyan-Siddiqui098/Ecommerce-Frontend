import React from 'react'
import UserMenu from '../../components/UserMenu'

const UserOrders = () => {
    document.title = 'Your Orders'
  return (
    <div className=" min-h-screen flex  w-full">
      <UserMenu />
      <div className="p-1 sm:pl-3 sm:py-3">
        <h1 className="sm:text-xl">All Orders</h1>
      </div>
    </div>
  )
}

export default UserOrders