import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 // Corrected import for jwt-decode
import loginImage from '../assets/login -2.png'; // Add your image here

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Log the response for debugging
      console.log('Response Status:', response.status);
      console.log('Response Data:', data);

      if (response.ok && data.token) {
        // Save token in localStorage
        const { token } = data; // Assuming response includes token
        localStorage.setItem('token', token);
        
        navigate('/dashboard'); // Redirect to the dashboard on successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error); // Log the error
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex flex-col">
      {/* Return to Homepage Link */}
      <Link
        to="/"
        className="text-[#F68D2E] font-semibold underline mb-6 hover:text-[#E06E23] transition-colors"
      >
        Return to HomePage
      </Link>
  
      {/* Login Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="flex justify-center items-center mb-6 lg:mb-0">
          <img
            src={loginImage}
            alt="Login"
            className="w-3/4 h-auto object-contain"
          />
        </div>
  
        {/* Form Section */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#F68D2E]">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#F68D2E] text-white py-3 rounded-lg hover:bg-[#E06E23] transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">Don't have an account?</p>
            <a href="/signup" className="text-[#F68D2E] hover:underline">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;
