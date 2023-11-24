import React from "react";

const CategoryFilter = ({
  categories,
  setMenu,
  menu,
  handleFilterCategory,
}) => {
  return (
    <>
      <div
        className={`text-sm sm:text-base ${
          menu ? "flex w-[50vw] visible" : "p-0 w-0 overflow-hidden invisible"
        } px-1 py-3 min-h-min flex-col items-center transition-[width] my-4 sm:flex sm:w-64 sm:px-4 sm:pb-3 sm:visible `}
      >
        <h5 className="self-start mb-3  font-semibold">By Category</h5>
        {categories?.map((category) => (
          <fieldset
            key={category._id}
            className="flex gap-1 w-full  last:border-none  border-b border-[#002147be]"
          >
            <input
              onChange={(e) =>
                handleFilterCategory(e.target.checked, category._id)
              }
              type="checkbox"
              name={`${category.slug}`}
              id={`${category.slug}`}
            />
            <label className="w-full " htmlFor={`${category.slug}`}>
              {category.name}
            </label>
          </fieldset>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;
