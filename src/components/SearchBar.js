import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchResult } from "../store/SearchSlice";
import { switchAlert, triggerAlert } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  //TO DO - craete api in backend for search and integrate here.
  const searchProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/product-search/${keywords}`
      );
      const json = await res.json();
      if (json.success) {
        dispatch(setSearchResult(json));
        navigate("/search");
      }
    } catch (error) {
      dispatch(triggerAlert(error));
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13 && keywords.length > 0) {
      searchProduct();
    }
  };
  return (
    <div className="w-full max-w-[180px] flex flex-col items-center justify-center gap-1 sm:gap-2 sm:flex-row md:max-w-[250px] ">
      <input
        type="search"
        name="search"
        id="search"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="text-sm p-1 w-full text-black px-2 rounded sm:text-base"
        placeholder="Search"
        onKeyUp={handleEnterKey}
      />
      <button
        onClick={searchProduct}
        className="border-green-400 border py-1 px-2 text-sm w-full sm:w-max rounded transition hover:bg-green-700 hover:text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
