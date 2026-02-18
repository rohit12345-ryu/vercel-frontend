// src/components/NutritionCategories.jsx
import React from "react";
import "../styles/nutrition.css";
const categories = [
  { name: "Weight Loss", calories: "1200-1500 kcal", macros: "Protein 40%, Carbs 35%, Fat 25%" },
  { name: "Weight Gain", calories: "2500-3000 kcal", macros: "Protein 30%, Carbs 50%, Fat 20%" },
  { name: "Muscle Building", calories: "2200-2700 kcal", macros: "Protein 35%, Carbs 40%, Fat 25%" },
  { name: "Cutting", calories: "1500-1800 kcal", macros: "Protein 45%, Carbs 30%, Fat 25%" },
  { name: "Maintenance", calories: "2000-2500 kcal", macros: "Protein 30%, Carbs 40%, Fat 30%" },
];

const NutritionCategories = () => {
  return (
    <div className="categories-container">
      {categories.map((cat, index) => (
        <div key={index} className="category-card">
          <h2>{cat.name}</h2>
          <p><strong>Calories:</strong> {cat.calories}</p>
          <p><strong>Macros:</strong> {cat.macros}</p>
        </div>
      ))}
    </div>
  );
};

export default NutritionCategories;
