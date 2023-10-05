import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import { switchAlert, triggerAlert } from "../../store/UserSlice";
import CategoryForm from "../../components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  // New category name
  const [name, setName] = useState("");

  //-----Modal-----
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdateName] = useState("");
  const [id, setId] = useState(null);
  // Redux Store
  const { authToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //----- Handle subtmi for new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const category = await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authToken,
          },
          body: JSON.stringify({ name }),
        }
      );

      const json = await category.json();
      console.log(json);
      if (json.success) {
        setCategories((pre) => pre.concat(json.category));
      }

      dispatch(triggerAlert(json));
    } catch (error) {
      dispatch(triggerAlert(error));
    } finally {
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  //----- Handle Delete category
  const handleDeleteCategory = async (id) => {
    try {
      // e.preventDefault();
      const deletedCat = await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: authToken,
          },
        }
      );

      const json = await deletedCat.json();
      if (json.success) {
        setCategories(categories.filter((cat) => cat._id !== id));
      }
      dispatch(triggerAlert(json));
    } catch (error) {
      console.log(error);
      dispatch(triggerAlert(error));
    } finally {
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  //----- Handle Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: authToken,
          },
          body: JSON.stringify({ name: updatedName }),
        }
      );

      const json = await updatedCategory.json();
      if (json.success) {
        let updateCat = categories.map((el) =>
          el._id === json.category._id ? json.category : el
        );
        setCategories(updateCat);
        setVisible(false);
      }
      dispatch(triggerAlert(json));
    } catch (error) {
      console.log(error);
      dispatch(triggerAlert(error));
    } finally {
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  //----- Get all categories when first load
  useEffect(() => {
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
        dispatch(triggerAlert(error));
      } finally {
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    getAllCategories();
  }, [dispatch]);

  return (
    <div className="relative min-h-screen flex  w-full">
      <AdminMenu />
      <div className=" p-1 min-w-[10rem] sm:pl-3 sm:py-3 sm:min-w-[50%]">
        <h1 className="sm:text-xl my-4">Create Category</h1>
        {/*  CREATE CATEGORY */}
        <div className="mb-7">
          <CategoryForm
            handleSubmit={handleCreateCategory}
            value={name}
            setValue={setName}
          />
        </div>

        {/*========== TABLE =============== */}
        <CategoryTable categories={categories} setVisible={setVisible} setUpdateName={setUpdateName} setId={setId} handleDeleteCategory={handleDeleteCategory}/>
      </div>
      {/* OUTER MODAL */}
      <div
        onClick={(e)=>(e.target.classList.contains('modal'))?setVisible(false): ''}
        className={`modal absolute top-0 min-h-screen z-10 p-3 bg-slate-950 bg-opacity-50 ${
          visible ? "flex w-full" : "hidden w-0"
        } flex justify-center`}
      >
        <div
          className={`bg-slate-950 rounded-md p-5 py-10 flex flex-col gap-9 item-center h-max min-h[30vh] min-w-[50vw] sm:min-w-[22rem]`}
        >
          <button
            onClick={() => setVisible(false)}
            className="bg-slate-900 text-sm py-[2px] px-2 rounded-md self-start text-gray-200 sm:text-base mb-5"
          >
            Back
          </button>
          <CategoryForm
            handleSubmit={handleUpdateCategory}
            placeholder={"Update category"}
            value={updatedName}
            setValue={setUpdateName}
            btnText={"Update"}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
