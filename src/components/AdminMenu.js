import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [menu, setMenu] = useState(false);
  const adminLink = [
    {
      name: "Create Product",
      href: "/dashboard/admin/create-product",
    },
    {
      name: "Create Category",
      href: "/dashboard/admin/create-category",
    },
    {
      name: "Users",
      href: "/dashboard/admin/users",
    },
  ];

  return (
    <div className=" min-w-[50px] relative bg-gray-50">
      {/* MENU ICONs FOR MOBILE VIEW --- START */}
      <div
        className="absolute top-100% my-1 z-10 w-[50px]  flex justify-center items-center sm:hidden"
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
      {/* MENU ICON FOR MOBILE --- END */}

      {/* ADMIN MENU -- START */}
      <div
        className={`${
          menu ? "flex w-[40vw] visible" : "p-0 w-0 overflow-hidden invisible"
        } px-1 py-6 min-h-min flex-col items-center border rounded-lg bg-gray-100 transition-[width] my-7 sm:flex sm:w-64 sm:px-4 sm:py-6 sm:visible `}
      >
        <h4 className="font-semibold mb-4 sm:text-xl">Admin Menu</h4>
        <ul className="text-sm  w-full sm:text-base">
          {adminLink.map(({name, href}, index) => {
            return (
              <li
                key={index}
                className="py-1 border-t-2 border-slate-400 block "
              >
                <NavLink
                  key={index}
                  className={({ isActive}) =>
                   isActive ? "text-blue-600 sm:font-semibold" : ""}
                  to={href}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {/* ADMIN MENU --- END */}
    </div>
  );
};

export default AdminMenu;
