import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api/api";

export  function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailAddress = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setCpassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const signupData = {
        username,
        email,
        password,
        cpassword,
      };
      console.log(signupData);
      const response = await axios.post(`${api}/register`, signupData);
      await setDatas([...datas, signupData]);
      if (response) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };  

  return (
    <main className="login ">
      <div className="flex  flex-col justify-center items-center  h-screen">
        <div className="flex justify-center items-center bg-white rounded-md mb-10 ">
          <div className="flex flex-col  m-10 bg-white">
            

            <h1 className="text-2xl font-semibold px-2 bg-white">Register</h1>
            <p className="text-base font-light px-2 bg-white">to access Expense Tracker</p>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => handleUsername(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md "
            />
            <input
              type="text"
              placeholder="Email address"
              onChange={(e) => handleEmailAddress(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => handlePassword(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            <input
              type="text"
              placeholder="Confirm Password"
              onChange={(e) => handleConfirmPassword(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            <button
             className="m-2 p-2 border rounded-lg bg-buttonColor text-orange-200 bg-orange-900 font-bold  cursor-pointer"
              onClick={() => handleSignUp()}
            >
              Register
            </button>
            <p className="text-base font-light px-2 my-1 bg-white">
              Already have an account?{" "}
              <span className="text-buttonColor font-semibold cursor-pointer">
                <Link to={"/login"} className="bg-white"> Sign In</Link>
              </span>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}