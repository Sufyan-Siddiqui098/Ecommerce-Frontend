import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useDispatch } from "react-redux";
import { switchAlert, triggerAlert } from "../../store/UserSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/get-products`
        );
        const json = await res.json();
        //If success - set The categories
        if (json.success) {
          setProducts(json.product);
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

    getAllProducts();
  }, [dispatch]);
  return (
    <div className="min-h-screen flex  w-full">
      <AdminMenu />
      <div className="p-1 w-[60vw] sm:pl-4">
        <h1 className="text-lg sm:text-2xl my-3 sm:mt-5 md:text-3xl font-semibold p-1">Products</h1>
        <div className="my-4 p-1 flex gap-1 flex-wrap sm:gap-2">
          {products?.map((product) => (
            <Link
              to={`/dashboard/admin/product/${product.slug}`}
              key={product._id}
              className="shadow-md border rounded overflow-hidden w-40 sm:w-48 sm:min-h-[12rem] transition hover:scale-[1.02] focus:scale-[1.02]"
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
                  <p className="text-xs sm:text-sm  ">{product.description}</p>
                  <p className="text-xs sm:text-sm mt-1 text-gray-500 justify-self-end font-mono self-end ">
                    {product.price}$
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
