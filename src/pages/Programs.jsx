import React from "react";
import "./Programs.css";

const programs = [
  {
    title: "Foundation Builder",
    level: "Beginner",
    duration: "8 weeks",
    frequency: "3x/week",
    calories: "300-400",
    rating: "4.8",
    popular: true,
  },
  {
    title: "Mass Architect",
    level: "Intermediate",
    duration: "12 weeks",
    frequency: "5x/week",
    calories: "500-700",
    rating: "4.9",
    premium: true,
  },
  {
    title: "Inferno HIIT",
    level: "Intermediate",
    duration: "6 weeks",
    frequency: "4x/week",
    calories: "600-800",
    rating: "4.7",
  },
  {
    title: "Iron Warrior",
    level: "Advanced",
    duration: "16 weeks",
    frequency: "6x/week",
    calories: "400-600",
    rating: "4.9",
    premium: true,
  },
  {
    title: "Flex Flow",
    level: "Beginner",
    duration: "4 weeks",
    frequency: "5x/week",
    calories: "150-250",
    rating: "4.6",
  },
  {
    title: "Tactical Athlete",
    level: "Advanced",
    duration: "10 weeks",
    frequency: "5x/week",
    calories: "500-700",
    rating: "4.8",
    premium: true,
  },
];

function Programs() {
  return (
    <div className="programs-page">
      <div className="hero">
        <h1>
          TRAINING <span>PROGRAMS</span>
        </h1>
        <p>
          Expert-designed programs for every goal, from beginner to advanced.
        </p>

        <div className="stats">
          <div>
            <h3>12,400+</h3>
            <p>Active Members</p>
          </div>
          <div>
            <h3>98%</h3>
            <p>Success Rate</p>
          </div>
          <div>
            <h3>6</h3>
            <p>Expert Programs</p>
          </div>
          <div>
            <h3>24/7</h3>
            <p>Coach Support</p>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <span>Difficulty:</span>
          <button className="active">All</button>
          <button>Beginner</button>
          <button>Intermediate</button>
          <button>Advanced</button>
        </div>

        <div className="filter-group">
          <span>Category:</span>
          <button className="active">All</button>
          <button>Strength</button>
          <button>Hypertrophy</button>
          <button>Cardio</button>
          <button>Flexibility</button>
          <button>Functional</button>
        </div>
      </div>

      <div className="cards">
        {programs.map((program, index) => (
          <div key={index} className="card">
            {program.popular && <span className="badge popular">POPULAR</span>}
            {program.premium && <span className="badge premium">PREMIUM</span>}

            <div className="card-header">
              <h2>{program.title}</h2>
              <span className="rating">Rating {program.rating}</span>
            </div>

            <p className="level">{program.level}</p>

            <div className="card-info">
              <div>
                <p>Duration</p>
                <h4>{program.duration}</h4>
              </div>
              <div>
                <p>Frequency</p>
                <h4>{program.frequency}</h4>
              </div>
              <div>
                <p>Cal/Session</p>
                <h4>{program.calories}</h4>
              </div>
            </div>

            <button className="view-btn">View Full Program</button>
          </div>
        ))}
      </div>

      <div className="pricing">
        <h2>
          FREE VS <span>PREMIUM</span>
        </h2>

        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Free</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Personalized Schedule</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Weekly Workout Plans</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Video Exercise Library</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>1-on-1 Coach Check-ins</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Nutrition Meal Plans</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>

        <button className="upgrade-btn">Upgrade to Premium</button>
      </div>
    </div>
  );
}

export default Programs;
