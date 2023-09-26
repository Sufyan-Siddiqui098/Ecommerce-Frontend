import React from 'react'
import AdminMenu from '../../components/AdminMenu'

const CreateCategory = () => {
  return (
    <div className='border-2 border-red-200 min-h-screen flex  w-full'>
    <AdminMenu/>
    <div className='p-1 sm:pl-3 sm:py-3'>
        <h1 className='sm:text-xl'>Create Category</h1>
    </div>
</div>
  )
}

export default CreateCategory