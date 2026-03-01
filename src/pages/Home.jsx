import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="home-hero page-shell">
      <div className="hero-spark hero-spark-left" aria-hidden="true" />
      <div className="hero-spark hero-spark-right" aria-hidden="true" />

      <div className="home-copy">
        <p className="home-kicker">WELCOME TO FITPRO</p>
        <h1>
          THE MOST COMPLETE
          <br />
          GYM TO WORK OUT
        </h1>
        <p className="home-lead">
          Build your best physique with data-driven programs, adaptive nutrition, and practical AI tools that
          keep you consistent every week.
        </p>

        <div className="hero-ctas">
          <button className="btn-main" onClick={() => navigate("/programs")}>Explore Programs</button>
          <button className="btn-ghost" onClick={() => navigate("/store")}>Shop Supplements</button>
        </div>
      </div>

      <div className="home-visual">
        <div className="visual-brush" />
        <img
          src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=1000&auto=format&fit=crop"
          alt="athlete"
        />
        <div className="hero-stat top">330 Completed Programs</div>
        <div className="hero-stat bottom">12+ Years of Experience</div>
      </div>
    </section>
  );
}

export default Home;
