import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const api = 'YOUR_API_BASE_URL'; // Replace with your actual API base URL

export const Navbar = () => {
    const navigate = useNavigate();
    
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('login') === 'true';

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            // Make the API call to log out
            await axios.get(`${api}/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Clear localStorage
            localStorage.removeItem('login');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            
            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="h-[70px] flex justify-between items-center">
            <h1 className="mx-3 font-bold text-2xl text-orange-900">
                HR Expense Tracker
            </h1>
            <ul className="flex">
                <li className="mx-3 font-bold text-xl text-orange-900 cursor-pointer">
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li className="mx-3 font-bold text-xl text-orange-900 cursor-pointer">
                    <Link to={'/expense-list'}>Expense List</Link>
                </li>
                <li className="mx-3 font-bold text-xl text-orange-900 cursor-pointer">
                    <Link to={'/account'}>Account</Link>
                </li>
            </ul>
            {isLoggedIn ? (
                <button 
                    className="mx-3 font-bold text-xl mr-32 bg-orange-900 px-4 py-2 rounded-lg text-[#f0e6d7]" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            ) : (
                <button 
                    className="mx-3 font-bold text-xl mr-32 bg-orange-900 px-4 py-2 rounded-lg text-[#f0e6d7]" 
                    onClick={handleLogin}
                >
                    Login
                </button>
            )}
        </nav>
    );
};
