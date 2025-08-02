import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Password:", password);
    // signup logic here
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="absolute top-5 left-5 text-2xl font-bold text-blue-600">
        civicTrack
      </div>
      <button
        onClick={() => navigate("/home")}
        className="absolute top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Home
      </button>

      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

       {[
  { label: "Username", value: username, setValue: setUsername, type: "text" },
  { label: "Email", value: email, setValue: setEmail, type: "email" },
  { label: "Phone", value: phone, setValue: setPhone, type: "tel" },
  { label: "Password", value: password, setValue: setPassword, type: "password" }
].map(({ label, value, setValue, type }, idx) => (
  <div className="mb-4 flex items-center gap-4" key={idx}>
    <label className="w-24 text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex-1 border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:border-blue-500"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
))}


        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Sign;
