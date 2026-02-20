import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-root">
      <div className="dash-hero">
        <div className="dash-hero-content">
          <h2>Welcome back, {user?.name || "Athlete"}</h2>
          <p>Track progress, manage plans, and shop supplements all in one place.</p>
          <div className="dash-actions">
            <button className="dash-btn" onClick={() => navigate("/programs")}>My Programs</button>
            <button className="dash-btn" onClick={() => navigate("/store")}>Store</button>
            <button className="dash-btn outline" onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </div>

      <div className="dash-cards">
        <div className="dash-card">
          <img src="https://images.unsplash.com/photo-1546484959-f1c6b6d2df50?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a4d8f0e1b8b" alt="workout" />
          <h3>Workouts</h3>
          <p>Personalized training plans that adapt as you progress.</p>
        </div>

        <div className="dash-card">
          <img src="https://images.unsplash.com/photo-1604739825400-9bb8e4b22b10?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8f4b6e3e3b4a" alt="nutrition" />
          <h3>Nutrition</h3>
          <p>Track macros and get meal suggestions based on your goals.</p>
        </div>

        <div className="dash-card">
          <img src="https://images.unsplash.com/photo-1599058917210-6c6a7fa6b5b2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f7b3d2a8c6d" alt="supplements" />
          <h3>Supplements</h3>
          <p>Shop top supplements curated for performance and recovery.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
