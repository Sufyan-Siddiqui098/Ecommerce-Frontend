import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, switchAlert } from "../store/UserSlice";

const Header = () => {
  const navBar = useRef(null);
  const sideBar = useRef(null);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

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
        <Link to="/" className="link logo">
          🛒 Ecommerce App
        </Link>
        <div className="sideBar" ref={sideBar} onClick={deActiveNavBar}></div>
        <RxHamburgerMenu className="menu" onClick={activeNavBar} />
        <nav ref={navBar}>
          <Link className="link nav-link" onClick={deActiveNavBar} to="/">
            Home
          </Link>
          <Link
            className="link nav-link"
            onClick={deActiveNavBar}
            to="/category"
          >
            Category
          </Link>
          {authToken ? (
            <>
              <Link
                className="link nav-link"
                onClick={deActiveNavBar}
                to="/cart"
              >
                Cart (0)
              </Link>
              {/* <Link className="link btn"onClick={logout} to="/login">Logout</Link> */}
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
                      onClick={(e)=>{logout(); deActiveNavBar(e)}}
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
