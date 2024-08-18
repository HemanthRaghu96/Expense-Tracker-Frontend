import React, {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api/api";

export  function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [datas, setDatas] = useState([]);
  const navigate=useNavigate()

 
  const handleLogin = async () => {
    try {
      const loginData = {
        email,
        password,
      };
      console.log(loginData);
      const response = await axios.post(`${api}/login`, loginData);
      await setDatas([...datas, loginData]);
      localStorage.setItem("login", "true");
      response.data.result.token &&
        localStorage.setItem("token", response.data.result.token || "");
        localStorage.setItem("email",email)
        setError(false)
        if( localStorage.getItem("login", "true")){
          navigate('/dashboard')
        }
     
    } catch (err) {
      console.log("Error", err.message);
      setError(true)
    }
  };

  const handleEmailadress = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="login ">
      <div className="flex  flex-col justify-center items-center  h-screen">
        <div className="flex justify-center items-center bg-white rounded-md mb-10 ">
          <div className="flex flex-col  m-10 bg-white ">
             

            <h1 className="text-2xl font-semibold px-2 bg-white">Sign in</h1>
            <p className="text-base font-light px-2 bg-white">to access Expense Tracker</p>
            <input
              type="text"
              placeholder="Email address"
              onChange={(e) => handleEmailadress(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => handlePassword(e)}
              className="m-2 px-2 py-1 border bg-slate-100 rounded-md"
            />
             {error? <p className="text-xs font-bold px-2 text-red-500 bg-white">Invalid emailID or Password</p>:""}
            
            <button
              className="m-2 p-2 border rounded-lg bg-buttonColor text-orange-200 bg-orange-900 font-bold  cursor-pointer"
              onClick={() => handleLogin()}
            >
              Login
            </button>
            <p className="text-base font-light px-2 my-1 bg-white">
              Don't have an account?{" "}
              <span className="text-buttonColor font-semibold cursor-pointer bg-white">
                <Link to={"/signup"} className="bg-white"> Register now</Link>
              </span>
            </p>
            <div className="flex flex-col justify-center items-center mt-2 bg-white">
              <p className="text-base font-semibold bg-white">Demo User</p>
              <p className="text-base font-light bg-white">Email : test@gmail.com</p>
              <p className="text-base font-light bg-white">Password : test123</p>
            </div>
          </div>
        </div>

   
      </div>
    </main>
  );
}