import { Link, useNavigate } from "react-router-dom";

// Navigation Logic
function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MindScope
      </Link>

      <div className="navbar-right">
        {user && (
          <span className="navbar-user">
            Welcome, {user.username}
          </span>
        )}

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;