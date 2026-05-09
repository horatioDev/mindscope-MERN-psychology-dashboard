import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

function Register() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await registerUser(formData);

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      // Store logged in user
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect to dashboard
      navigate("/");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message || "Registration failed"
      );

    }
  };

  return (

    <div className="auth-page">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start tracking your mood and reflection patterns.
        </p>

        {error && <p className="error-message">{error}</p>}

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Submit */}
        <button type="submit">
          Register
        </button>

        {/* Login Link */}
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>

  );

}

export default Register;