import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Alert from "./Alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, switchAlert } from "../store/UserSlice";

const Header = () => {
  const navBar = useRef(null);
  const sideBar = useRef(null);
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state.user);
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
  const logout = ()=> {
    dispatch(logoutUser("Logout Successfully"))
    setTimeout(() => {
      dispatch(switchAlert());
    }, 2000);
  }

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
          {authToken ? 
              (<>
              <Link className="link nav-link" onClick={deActiveNavBar} to="/cart">Cart (0)</Link>
              <Link className="link btn"onClick={logout} to="/login">Logout</Link>
              </>) : (<>
              <Link className="link nav-link" onClick={deActiveNavBar} to="/register">Register</Link>
              <Link className="link nav-link" onClick={deActiveNavBar} to="/login">Login</Link>
              <Link className="link nav-link" onClick={deActiveNavBar} to="/cart">Cart (0)</Link>
                    </>)
          }
        </nav>
        <Alert />
      </header>
    </>
  );
};

export default Header;
