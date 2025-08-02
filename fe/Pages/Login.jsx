<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // login logic here
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="absolute top-5 left-5 text-2xl font-bold text-blue-600">
        civicTrack
      </div>
      <button
        onClick={() => navigate("/home")}
        className="absolute top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Home
      </button>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4 flex flex-row items-baseline gap-5">
          <label className="text-gray-700 w-24">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-4 flex flex-row items-baseline gap-5">
          <label className="text-gray-700 w-24">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register Here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
=======
import React from 'react'

function Login() {
    return (
        <div>
            
        </div>
    )
}

export default Login
>>>>>>> 95828edf097ec62e484d0427d32175211ca021a6
