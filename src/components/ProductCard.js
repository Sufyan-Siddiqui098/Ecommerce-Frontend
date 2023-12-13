import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/CartSlice";
import { switchAlert, triggerAlert } from "../store/UserSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(triggerAlert({ success: true, message: "Added Successfully !" }));
    setTimeout(() => {
      dispatch(switchAlert());
    }, 1200);
  };

  return (
    <>
      {/* Mapping Product's array */}
      {products?.map((product) => (
        <div
          key={product._id}
          className="shadow-md border pb-1 rounded overflow-hidden w-44 sm:w-48  sm:min-h-[20rem] transition hover:scale-[1.02] focus:scale-[1.02]"
        >
          <div className="h-36">
            <img
              className="h-full w-full object-cover"
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>
          <div className="flex flex-col gap-1 p-1 h-[calc(100%-9.1rem)]  sm:p-3">
            <p className="text-sm text-sky-700 sm:text-base font-semibold my-1 ">
              {product.name}
            </p>
            <div className="flex flex-col justify-between h-full">
              <p className="text-xs sm:text-sm">
                {product.description.length > 30
                  ? product.description.substring(0, 40) + "..."
                  : product.description}
              </p>
            </div>

            {/* PRICE */}
            <div className="my-1 flex justify-end pr-2">
              <p className="text-sm sm:text-base mt-1 text-black justify-self-end font-mono self-end font-semibold">
                {product.price}$
              </p>
            </div>
            {/* CART BUTTONS */}
            <div className="flex justify-between items-center gap-1 mt-2 flex-wrap">
              <button
                onClick={() => addItemToCart(product)}
                className="bg-blue-600 text-white text-xs sm:text-sm rounded pb-[.25rem] pt-[.2rem] px-[5px] hover:bg-blue-800"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.slug}`}
                className="bg-slate-700 text-white text-xs sm:ext-sm rounded pt-[.2rem] pb-[.25rem] px-[5px] hover:bg-slate-900"
              >
                More Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
