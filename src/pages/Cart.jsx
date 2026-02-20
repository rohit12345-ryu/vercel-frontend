import React, { useEffect, useState } from "react";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>Rs {item.price}</p>
              </div>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button onClick={() => removeItem(item.id)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}

          <h2 className="cart-total">Total: Rs {total}</h2>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");

              if (!token) {
                window.location.href = "/login";
                return;
              }

              window.location.href = "/checkout";
            }}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
