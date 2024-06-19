import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <header className=" bg-slate-300  py-5  list-none">
        <div className=" ml-32 mr-32">
          <nav className="flex justify-between ">
            <div className="flex items-center gap-8">
              <li>
              <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/AddProduct">Add New Product</Link>
              </li>
            </div>
            <div className="flex items-center gap-8">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">SignUp</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </div>
          </nav>
        </div>
      </header>
       <Outlet />
    </React.Fragment>
  );
}

export default Navbar;
