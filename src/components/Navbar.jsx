import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/notes-logo.png"

const Navbar = () => {
  const navigate = useNavigate();

   // Logout function
   const handleLogout = () => {
    axios.get("https://notes-taker-backend.onrender.com/api/auth/logout")
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      });
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <nav className=" bg-[#0C8CE9] text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
        <img src={logo} alt="" size='2' className='w-[60px]'/>
        <Link to="/dashboard" className="font-bold text-3xl">DASHNOTE</Link>
        </div>
        <div>
          
        <button
          onClick={handleLogout} // Call handleLogout on button click
          className=" bg-[#0C8CE9] text-white py-3 px-6 rounded-lg shadow-xl 
    font-bold transition-transform duration-300 
    hover:bg-white hover:text-[#0C8CE9] hover:-translate-y-1 hover:shadow-2xl"
        >
          Sign Out
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
