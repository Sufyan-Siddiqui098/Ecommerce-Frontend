// import React, { useEffect } from 'react'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { switchAlert, triggerAlert } from "../store/UserSlice";
import CategoryFilter from "../components/Filters/CategoryFilter";
import PriceFilter from "../components/Filters/PriceFilter";
// import { checkUser } from '../store/UserSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  //Filters
  const [checkCategory, setCheckCategory] = useState([]);
  const [radio, setRadio] = useState([]);
  //Products
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  //Menu for Mobile view
  const [menu, setMenu] = useState(false);

  const handleFilterCategory = (checked, id) => {
    let all = [...checkCategory];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((cat) => cat !== id);
    }
    setCheckCategory(all);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/get-products`
        );
        const json = await res.json();
        if (json.success) {
          setProducts(json.product);
          setProductCount(json.totalCount);
        }
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    const getAllCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/category/all-categories`
        );
        const json = await res.json();
        if (json.success) {
          setCategories(json.category);
        }
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    //Calling function
    if (!checkCategory.length && !radio.length) {
      getAllProducts();
    }
    getAllCategories();
  }, [dispatch, radio.length, checkCategory.length]);

  useEffect(() => {
    const getFilteredProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checked: checkCategory, radio }),
          }
        );
        const json = await res.json();
        if (json.success) {
          setProducts(json.filterProduct);
          setProductCount(json.totalCount);
        }
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };
    if (radio.length || checkCategory.length) {
      getFilteredProduct();
    }
  }, [dispatch, checkCategory, radio]);

  document.title = "Ecommerce App | Home";
  return (
    <div className="min-h-creen flex w-full">
      {/* Filter Column*/}
      <div className="flex flex-col items-center min-w-max min-h-screen relative bg-gray-50 overflow-x-scroll sm:overflow-hidden">
        {/* Menu for mobile view */}
        <div
          className=" self-start my-1 z-10 w-[50px]  flex justify-center items-center sm:hidden"
          onClick={() => setMenu((pre) => !pre)}
        >
          {/* Conditional svg rendering for mobile view*/}
          {!menu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <h3
          className={`${
            menu ? "visible" : "invisible"
          } sm:visible font-semibold sm:mt-4 justify-self-start`}
        >
          Filters
        </h3>
        {/* Category Filter */}
        <CategoryFilter
          menu={menu}
          handleFilterCategory={handleFilterCategory}
          categories={categories}
        />
        {/* Price Filter */}
        <PriceFilter menu={menu} setRadio={setRadio} />
      </div>
      {/* Filter Column --- END */}

      {/* Product Column */}
      <div className="flex flex-col w-full overflow-x-scroll">
        <div className="w-full flex justify-end">
          <p className="text-gray-500 mt-4 mr-3 sm:mr-4 font-semibold">
            Total Product : {productCount}
          </p>
        </div>
        <div className="my-4 p-1 min-w-[60vw] sm:pl-4  flex gap-1 flex-wrap sm:gap-2">
          {products?.map((product) => (
            <div
              key={product._id}
              className="shadow-md border pb-1 rounded overflow-hidden w-40 sm:w-48 sm:min-h-[12rem] sm:h-[18rem] transition hover:scale-[1.02] focus:scale-[1.02]"
            >
              <div className="h-32">
                <img
                  className="h-full w-full object-cover"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col gap-1 p-1 h-[calc(100%-8.1rem)]  sm:p-3">
                <p className="text-sm text-sky-700 sm:text-base font-semibold my-1 ">
                  {product.name}
                </p>
                <div className="flex flex-col justify-between h-full">
                  <p className="text-xs sm:text-sm ">
                    {product.description.length > 30
                      ? product.description.substring(0, 50) + "..."
                      : product.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <button className="bg-blue-600 text-white text-sm sm:text-base rounded py-[.2rem] px-1 hover:bg-blue-800">
                    Add To Cart
                  </button>
                  <p className="text-sm sm:text-base mt-1 text-gray-500 justify-self-end font-mono self-end font-semibold">
                    {product.price}$
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
