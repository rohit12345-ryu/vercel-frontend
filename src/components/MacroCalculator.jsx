// src/components/MacroCalculator.jsx
import React, { useState } from "react";
import "../styles/nutrition.css";
const goals = [
  { name: "Weight Loss", protein: 0.4, carbs: 0.35, fat: 0.25 },
  { name: "Weight Gain", protein: 0.3, carbs: 0.5, fat: 0.2 },
  { name: "Muscle Building", protein: 0.35, carbs: 0.4, fat: 0.25 },
  { name: "Maintenance", protein: 0.3, carbs: 0.4, fat: 0.3 },
];

const MacroCalculator = () => {
  const [goal, setGoal] = useState(goals[0]);
  const [calories, setCalories] = useState(2000);
  const [macros, setMacros] = useState(null);

  const calculateMacros = () => {
    const protein = Math.round((calories * goal.protein) / 4);
    const carbs = Math.round((calories * goal.carbs) / 4);
    const fat = Math.round((calories * goal.fat) / 9);
    setMacros({ protein, carbs, fat });
  };

  return (
    <div className="calculator-card">
      <h2>Macro Split Calculator</h2>
      <div className="calculator-grid">
        <div>
          <label>Goal:</label>
          <select onChange={(e) => setGoal(goals[e.target.value])}>
            {goals.map((g, i) => <option key={i} value={i}>{g.name}</option>)}
          </select>
        </div>
        <div>
          <label>Calories:</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
        </div>
      </div>
      <button onClick={calculateMacros}>Calculate</button>
      {macros && <p className="result">Protein: {macros.protein}g | Carbs: {macros.carbs}g | Fat: {macros.fat}g</p>}
    </div>
  );
};

export default MacroCalculator;
