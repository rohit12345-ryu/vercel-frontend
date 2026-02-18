// src/pages/Nutrition.jsx
import React from "react";
import NutritionCategories from "../components/NutritionCategories";
import CalorieCalculator from "../components/CalorieCalculator";
import MacroCalculator from "../components/MacroCalculator";
import AITools from "../components/AITools";
import "../styles/nutrition.css";

const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <h1 className="title">Nutrition</h1>
      <NutritionCategories />
      <CalorieCalculator />
      <MacroCalculator />
      <AITools />
    </div>
  );
};

export default Nutrition;
