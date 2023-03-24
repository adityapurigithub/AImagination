import React from "react";

import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
const Nav = () => {
  return (
    <header className="flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img className="w-28 object-contain" src={logo} alt="" />
      </Link>
      <Link
        to="/create-post"
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
      >
        Create Post
      </Link>
    </header>
  );
};

export default Nav;
