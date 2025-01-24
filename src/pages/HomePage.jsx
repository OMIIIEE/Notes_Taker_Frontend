import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-center px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Organize Your Life with <span className="text-blue-500">DashNote</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl">
          Whether you're managing tasks, jotting down ideas, or planning projects, 
          DashNote makes it simple and efficient. Get started today and take control of your productivity!
        </p>
        <div className="flex space-x-4">
        <Link 
  to="/login" 
  className="
    bg-[#0C8CE9] text-white py-3 px-6 rounded-lg shadow-xl 
    font-bold transition-transform duration-300 
    hover:bg-white hover:text-[#0C8CE9] hover:-translate-y-1 hover:shadow-2xl
  "
>
  Login
</Link>

<Link 
  to="/signup" 
  className="
    bg-white text-[#0C8CE9] py-3 px-6 rounded-lg shadow-xl 
    font-bold text-lg transition-transform duration-300 
    hover:bg-[#0C8CE9] hover:text-white hover:-translate-y-1 hover:shadow-2xl
  "
>
  Sign Up
</Link>

        </div>
      </div>
      <footer className="bg-gray-100 py-6">
        <div className="text-center text-gray-500 text-sm">
          © 2025 DashNote. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
