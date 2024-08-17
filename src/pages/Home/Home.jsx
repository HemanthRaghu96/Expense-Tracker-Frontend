import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/dashboard')
    }
  return (
    <div className="flex flex-col justify-end items-center mt-32 lg:mt-40">
      <img
        src="https://media.gettyimages.com/id/1166373401/vector/financial-and-business-app-for-smartphone.jpg?s=612x612&w=0&k=20&c=jkhftNYCgAfMs7om025JT7Cf2q0IwxW-XdS9zDgHyT8="
        alt="homePic"
        className="h-[150px] lg:h-[250px] object-contain"
      />
      <h1 className="sm:text-3xl lg:text-4xl font-bold text-center">TAKE <span className="text-orange-400">CONTROL</span> <br/>OF YOUR <span className="text-blue-300">FINANCES</span></h1>
      <p className="text-sm lg:text-xl text-gray-600 mx-10 text-center">Effortlessly budget, save, and spend wisely with our all-in-one app</p>
    <div>
        <button className="text-white bg-black rounded-md px-6 py-2 mt-3" onClick={handleClick}>Get Started</button>
       
    </div>
    </div>
  );
};
