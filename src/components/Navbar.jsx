import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        {token && (
          <div className="menu-wrapper">
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            {menuOpen && (
              <div className="menu-dropdown">
                <div onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Dashboard</div>
                <div onClick={() => { navigate("/orders"); setMenuOpen(false); }}>My Orders</div>
                <div className="logout" onClick={logoutHandler}>Logout</div>
              </div>
            )}
          </div>
        )}
        <div className="logo">GYM AI</div>
      </div>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/programs">Programs</NavLink>
        <NavLink to="/nutrition">Nutrition</NavLink>
        <NavLink to="/ai-trainer">AI Trainer</NavLink>
        <NavLink to="/store">Store</NavLink>
        <NavLink to="/membership">Membership</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      {!token ? (
        <NavLink to="/login" className="login-btn">Login</NavLink>
      ) : null}
    </nav>
  );
}

export default Navbar;
