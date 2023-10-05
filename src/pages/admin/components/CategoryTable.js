import React from 'react'

const CategoryTable = ({categories, setVisible, setUpdateName, setId, handleDeleteCategory}) => {
  return (
    <div className="overflow-x-auto shadow-md rounded sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs sm:text-sm text-gray-800 uppercase ">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-1 sm:px-6 sm:py-3 bg-gray-50 "
                >
                  Name
                </th>
                <th scope="col" className="px-2 py01 sm:px-6 sm:py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="sm:text-base">
              {/*----------- MAPING on Categories --------------*/}
              {categories?.map((cat, ind) => {
                return (
                  <tr className=" border-b border-gray-200 " key={ind}>
                    <th
                      scope="row"
                      className="px-2 py-1 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50  "
                    >
                      {cat.name}
                    </th>
                    <td className="pl-2 pr-1 py-1 sm:px-6 sm:py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setVisible(true);
                          setUpdateName(cat.name);
                          setId(cat._id)
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteCategory(cat._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
  )
}

export default CategoryTable