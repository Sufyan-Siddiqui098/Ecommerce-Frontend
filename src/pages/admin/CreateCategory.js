import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useDispatch } from "react-redux";
import { switchAlert, triggerAlert } from "../../store/UserSlice";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const getAllCategories = async () => {
    try {
      const category = await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      const json = await category.json();
      //If success - set The categories
      if (json.success) {
        setCategories(json.category);
      }
    } catch (error) {
      console.log("create cateory Frontend", error);
      dispatch(triggerAlert(error.message));
    } finally {
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="min-h-screen flex  w-full">
      <AdminMenu />
      <div className="p-1 min-w-[10rem] sm:pl-3 sm:py-3 sm:min-w-[50%]">
        <h1 className="sm:text-xl my-4">Create Category</h1>

        {/* TABLE */}
        <div className="relative overflow-x-auto shadow-md rounded sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400 ">
            <thead className="text-xs sm:text-sm text-gray-800 uppercase ">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-1 sm:px-6 sm:py-3 bg-gray-50 "
                >
                  Name
                </th>
                <th scope="col" className="px-3 py01 sm:px-6 sm:py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="sm:text-base">
              {/* MAPING on Categories */}
              {categories?.map((cat, ind) => {
                return (
                  <tr className=" border-b border-gray-200 " key={ind}>
                    <th
                      scope="row"
                      className="px-3 py-1 sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50  "
                    >
                      {cat.name}
                    </th>
                    <td className="px-3 py-1 sm:px-6 sm:py-4">
                      <button className="text-blue-600">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
