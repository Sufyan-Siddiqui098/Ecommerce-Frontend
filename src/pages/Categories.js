import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  document.title = "Ecommerce App | All Category";
  return (
    <div className="">
      <h1 className="text-center text-xl mt-5 mb-3 font-medium sm:text-2xl sm:mb-4">
        All Categories
      </h1>
      <div className="flex flex-wrap p-3 gap-2 justify-cnter items-center mt-4 mx-auto w-max max-w-[100vw] sm:px-4">
        {categories?.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat.slug}`}
            className="transition-colors border py-1 px-2 rounded bg-slate-800 text-white hover:text-slate-800 hover:bg-white focus:text-slate-800 focus:bg-white border-slate-900"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
