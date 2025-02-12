// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boostLogo from '../assets/Secondary_Logo.png'; // Adjust the path if necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Proceed with login logic (e.g., API call)
    console.log('Logging in with:', { email, password });

    // TODO: Implement actual login logic here, such as an API call
    // For now, just navigate to the home page
    onLogin();
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-boost-orange flex items-center justify-center">
        <img src={boostLogo} alt="Boost Mobile Logo" className="max-w-4/5" />
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-80 p-5 rounded-lg">
          <div className="text-black text-3xl font-semibold mb-5">
            DDP Login
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="email"
                id="email"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-boost-orange"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="password"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-boost-orange"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-boost-orange"
            >
              Login
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4 text-center">
            New to DDP? <a href="/signup" className="text-boost-orange">Signup for our partner program here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
