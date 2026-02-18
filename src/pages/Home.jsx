import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <div className="overlay" />
      <div className="hero-content">
        <h1>Train Smarter. Recover Faster. Stay Consistent.</h1>
        <p>
          Personalized workouts, nutrition plans, and supplements tailored to
          your goals — powered by AI and expert guidance.
        </p>

        <div className="hero-ctas">
          <button className="btn primary" onClick={() => navigate("/programs")}>Explore Programs</button>
          <button className="btn" onClick={() => navigate("/store")}>Shop Supplements</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
