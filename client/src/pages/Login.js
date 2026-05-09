import { useState } from "react";
import { loginUser } from "../services/authServices";

function Login() {
  // Form/User Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error State
  const [error, setError] = useState("");

  // Handle form Data Changes
  const handleChange = (e => {  
    setFormData({
      ...formData,
      [e.target.value]: e.target.value,
    })
  });   

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      // Store logged in user
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect to dashboard
      window.location.href = "/";

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login Failed")
    }
  };

   return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;