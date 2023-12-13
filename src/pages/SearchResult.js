import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const SearchResult = () => {
  const { searchResult } = useSelector((state) => state.searchProduct);
  document.title = "Ecommerce | Search Result";
  return (
    <>
      <div className="p-2 w-full mb-5">
        <h4 className="my-2 mb-5 text-center text-gray-500 font-semibold">
          {searchResult?.length > 0 ? "Search Result" : "No Match found"}
        </h4>

        <div className=" flex gap-x-2 gap-y-5 flex-wrap sm:justify-center">
          <ProductCard products={searchResult} />
        </div>
      </div>
    </>
  );
};

export default SearchResult;
