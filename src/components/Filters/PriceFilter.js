import React from "react";
import { Prices } from "./Prices";

const PriceFilter = ({ menu, setRadio }) => {
  return (
    <div
      className={`text-sm sm:text-base ${
        menu ? "flex w-[50vw] visible" : "p-0 w-0 overflow-hidden invisible"
      } px-1 py-3 min-h-min flex-col items-center border rounded-lg bg-gray-100 transition-[width] my-7 sm:flex sm:w-64 sm:px-4 sm:pb-3 sm:visible `}
    >
      <h5 className="self-start mb-3 text-[#000000de] font-semibold">By Price</h5>
      {Prices?.map((p) => (
        <fieldset
          key={p._id}
          className="flex gap-1  w-full border-b-2 border-gray-400"
        >
          <input
            onChange={(e) => setRadio(p.array)}
            type="radio"
            name={"priceFilter"}
            id={`${p._id}`}
          />
          <label className="w-full " htmlFor={`${p._id}`}>
            {p.name}
          </label>
        </fieldset>
      ))}
    </div>
  );
};

export default PriceFilter;
