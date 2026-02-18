// src/components/CalorieCalculator.jsx
import React, { useState } from "react";
import "../styles/nutrition.css";
const CalorieCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState(1.2);
  const [calories, setCalories] = useState(null);

  const activityLevels = [
    { label: "Sedentary", value: 1.2 },
    { label: "Lightly active", value: 1.375 },
    { label: "Moderately active", value: 1.55 },
    { label: "Very active", value: 1.725 },
    { label: "Extra active", value: 1.9 },
  ];

  const calculateCalories = () => {
    let bmr;
    if (gender === "male") bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    else bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    setCalories(Math.round(bmr * activity));
  };

  return (
    <div className="calculator-card">
      <h2>Calorie Calculator</h2>
      <div className="calculator-grid">
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div>
          <label>Height (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className="full-width">
          <label>Activity Level:</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
            {activityLevels.map((level, index) => (
              <option key={index} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={calculateCalories}>Calculate</button>
      {calories && <p className="result">Your Daily Calories: {calories} kcal</p>}
    </div>
  );
};

export default CalorieCalculator;
