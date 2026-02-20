import React, { useState } from "react";
import toast from "react-hot-toast";
import "./Store.css";

const PRODUCTS = [
  { id: 1, name: "Premium Whey Protein", tagline: "High-quality protein for muscle growth and recovery", category: "Protein", price: 2499, image: "/preniumwhey.png" },
  { id: 2, name: "Plant Protein Blend", tagline: "Clean plant-based protein for daily nutrition", category: "Protein", price: 2199, image: "/plantprotein.png" },
  { id: 3, name: "Creatine Monohydrate", tagline: "Boost strength, power and workout performance", category: "Creatine", price: 899, image: "/creatine.jpg" },
  { id: 4, name: "Pre-Workout Energy", tagline: "Explosive energy and focus for intense training", category: "Pre-Workout", price: 1299, image: "/pre.png" },
  { id: 5, name: "Omega-3 Fish Oil", tagline: "Supports heart, joints and overall recovery", category: "Fish Oil", price: 799, image: "/fishoil.png" },
  { id: 6, name: "Mass Gainer", tagline: "High-calorie formula for fast weight gain", category: "Mass Gainer", price: 2999, image: "/massgainer.png" },
];

export default function Store() {
  const [category, setCategory] = useState("All");

  const filteredProducts = category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="store-page">
      <button className="cart-btn" onClick={() => (window.location.href = "/cart")}>Cart</button>

      <h1 className="store-title">Premium Supplements</h1>
      <p className="store-sub">Fuel your fitness journey with scientifically selected supplements</p>

      <div className="category-filter">
        {["All", "Protein", "Creatine", "Pre-Workout", "Fish Oil", "Mass Gainer"].map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={`cat-btn ${category === cat ? "active" : ""}`}> {cat} </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-media">
              <img src={p.image} alt={p.name} onError={(e) => (e.target.src = "/vite.svg")} />
              <span className="category-badge">{p.category}</span>
            </div>
            <div className="product-body">
              <h3 className="product-title">{p.name}</h3>
              <p className="product-tagline">{p.tagline}</p>
              <div className="product-meta">
                <span className="price">Rs {p.price}</span>
                <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
