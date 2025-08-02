import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setOtpSent(true);
      setError(null);
      alert("OTP sent to email!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");
      setOtpVerified(true);
      setError(null);
      alert("OTP verified!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setError("Please verify OTP before signing up");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, phone, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
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
              required
            />
          </div>
        ))}

        {!otpSent && (
          <button
            type="button"
            onClick={handleSendOTP}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition mb-2"
          >
            Send OTP
          </button>
        )}

        {otpSent && (
          <>
            <div className="mb-4 flex items-center gap-4">
              <label className="w-24 text-gray-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="flex-1 border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter OTP"
                required
              />
            </div>
            {!otpVerified && (
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-2"
              >
                Verify OTP
              </button>
            )}
          </>
        )}

        {error && <p className="text-red-600 text-sm mb-2 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          disabled={!otpVerified}
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
