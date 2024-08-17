import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate=useNavigate()
    const handleLogin=()=>{
navigate('/login')
    }
  return (
    <>
      <nav className="h-[70px]  flex justify-between items-center">
        <h1 className="mx-3 font-bold text-2xl text-orange-900">
          HR Expense Tracker
        </h1>
        <ul className="flex ">
          <li className="mx-3 font-bold text-xl text-orange-900 cursor-pointer"> <Link to={'/dashboard'}>Dashboard</Link></li>
          <li className="mx-3 font-bold text-xl text-orange-900 cursor-pointer">
          <Link to={'/expense-list'}>Expense List</Link> 
          </li>
          <li className="mx-3 font-bold text-xl text-orange-900 cursor-pointer"><Link to={'/account'}>Account</Link></li>
        </ul>
        <button className="mx-3 font-bold text-xl mr-32 bg-orange-900 px-4 py-2 rounded-lg text-[#f0e6d7]" onClick={handleLogin}>
          Login
        </button>
      </nav>
    </>
  );
};
