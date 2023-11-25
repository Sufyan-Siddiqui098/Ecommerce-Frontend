import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, switchAlert } from "../store/UserSlice";
import SearchBar from "./SearchBar";
import useCategory from "../hooks/useCategory";

const Header = () => {
  const navBar = useRef(null);
  const sideBar = useRef(null);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  const categories = useCategory(); //custom hook

  const { authToken, userInfo } = useSelector((state) => state.user);
  //-- For Hamburger Icon
  const activeNavBar = () => {
    if (navBar.current.classList.contains("active")) {
      navBar.current.classList.remove("active");
      sideBar.current.style.display = "none";
    } else {
      sideBar.current.style.display = "unset";
      navBar.current.classList.add("active");
    }
  };
  //-- Deactive the side bar
  const deActiveNavBar = (e) => {
    if (!e.target.classList.contains("active")) {
      sideBar.current.style.display = "none";
      navBar.current.classList.remove("active");
    }
  };

  //Logout User
  const logout = () => {
    dispatch(logoutUser("Logout Successfully"));
    setTimeout(() => {
      dispatch(switchAlert());
    }, 2000);
  };

  return (
    <>
      <header>
        <Link to="/" className="link logo text-[1rem] tracking-normal">
          🛒 Ecommerce App
        </Link>
        <div className="sideBar" ref={sideBar} onClick={deActiveNavBar}></div>
        {/* Hamburger Menu icon */}
        <div
          className="menu flex flex-col items-center gap-[5px] z-10 w-7 h-max"
          onClick={activeNavBar}
        >
          <span className="w-full h-[2px] bg-white rounded-md"></span>
          <span className="w-[70%] h-[2px] bg-white rounded-md"></span>
          <span className="w-full h-[2.1px] bg-white rounded-md"></span>
        </div>

        <nav ref={navBar} className="items-center">
          {/* Search Bar */}
          <SearchBar />

          {/* Navigation Links  */}
          <Link className="link nav-link" onClick={deActiveNavBar} to="/">
            Home
          </Link>
          <div className="relative  group" onClick={deActiveNavBar}>
            <span className="flex items-center gap-1 font-light">
              Category{" "}
              <svg
                className="fill-white text-sm"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </span>

            {/* DropDown */}
            <ul className="transition absolute invisible h-0 group-hover:visible group-hover:h-auto rounded flex -left-6 flex-col gap-1 z-10 bg-[#202020] top-[100%] py-3 px-2 shadow-md">
              <li className="text-sm hover:border-b w-max">
                <Link to={'/categories'}
                className="hover:opacity-80">
                  All Categories
                </Link>
              </li>
              {categories?.map((cat) => (
                <li key={cat._id} className="text-sm hover:border-b w-max">
                  <Link
                    className="hover:opacity-80"
                    to={`/category/${cat.slug}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {authToken ? (
            <>
              <Link
                className="link nav-link"
                onClick={deActiveNavBar}
                to="/cart"
              >
                Cart (0)
              </Link>
              <div
                className="relative inline-block text-left "
                onClick={() => setHidden((prev) => !prev)}
              >
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {userInfo.name}
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  hidden={hidden}
                  className="absolute top-[100%] right-[-60%] sm:right-0 z-10 mt-2 w-48 sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1 flex flex-col justify-center items-start">
                    <Link
                      onClick={deActiveNavBar}
                      to={`/dashboard/${
                        userInfo.role === 1 ? "admin" : "user"
                      }`}
                      className="text-gray-700 block px-4 py-2 text-sm hover:underline "
                    >
                      Dashboard
                    </Link>
                    <Link
                      className=" block px-4 py-2 text-sm text-gray-900 hover:underline "
                      onClick={(e) => {
                        logout();
                        deActiveNavBar(e);
                      }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                className="link nav-link"
                onClick={deActiveNavBar}
                to="/register"
              >
                Register
              </Link>
              <Link
                className="link nav-link"
                onClick={deActiveNavBar}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="link nav-link"
                onClick={deActiveNavBar}
                to="/cart"
              >
                Cart (0)
              </Link>
            </>
          )}
        </nav>
        <Alert />
      </header>
    </>
  );
};

export default Header;
