import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue, placeholder, btnText}) => {
  return (
    <>
        <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center gap-3 text-sm sm:text-base'>
            <input className='border-[1px] p-1 rounded sm:px-2' type="text" placeholder={placeholder || "Create new category"} value={value} onChange={(e)=> setValue(e.target.value)} />
            <button className='bg-blue-600 text-white rounded p-1 self-start sm:px-2'>{btnText || "Add Category"}</button>
        </form>
    </>
  )
}

export default CategoryForm