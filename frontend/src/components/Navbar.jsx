import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar bg-body-tertiary shadow-lg">
      <div className="container-fluid">
        <Link to={"/"}>
          <span className="navbar-brand mb-0 h1">Digi-Locker</span>
        </Link>
        <span>
          {!user ? (
            <>
              <Link
                to={"/register"}
                className=" mx-1 btn btn-sm btn-outline-warning"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className=" mx-1 btn btn-sm btn-outline-warning"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className=" mx-1 btn btn-sm btn-danger"
            >
              {" "}
              Logout{" "}
            </button>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
