import React from "react";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const { searchResult } = useSelector((state) => state.searchProduct);
  return (
    <>
      <div className="p-2 w-full mb-5">
        <h4 className="my-2 mb-5 text-center text-gray-500 font-semibold">
          {searchResult?.length > 0 ? "Search Result" : "No Match found"}
        </h4>

        <div className=" flex gap-x-2 gap-y-5 flex-wrap sm:justify-center">
          {searchResult?.map((product) => (
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
    </>
  );
};

export default SearchResult;
