import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/stacklyimg1.webp"

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "attendee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API Login Logic Here

    // Store role in localStorage
    localStorage.setItem("userRole", formData.role);

    if (formData.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">
        <div className="login-header">
        <div className="logo-container">
    {/* Replace src with your logo */}
    <img
      src={logo}
      alt="Logo"
      className="login-logo"
    />
  </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Login As</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="attendee">Attendee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="signup-text">
            New User?{" "}
            <Link to="/signup" className="signup-link">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;