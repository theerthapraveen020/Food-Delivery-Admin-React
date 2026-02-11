import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Login failed");
      }

      // Save JWT token
      localStorage.setItem("adminToken", data.token);

      toast.success("Login Successful");

      setTimeout(() => navigate("/add"), 800);

    } catch (error) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <img
          src={assets.logo}
          alt="logo"
          className="login-logo"
        />

        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
