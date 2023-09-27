import React from 'react'
import AdminMenu from '../../components/AdminMenu'

const CreateProduct = () => {
  return (
    <div className='min-h-screen flex  w-full'>
        <AdminMenu/>
        <div className='p-1 sm:pl-3 sm:py-3'>
            <h1 className='sm:text-xl'>CreateProduct</h1>
        </div>
    </div>
  )
}

export default CreateProduct