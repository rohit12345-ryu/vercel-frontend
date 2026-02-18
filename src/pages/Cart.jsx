import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // LOAD CART
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // UPDATE LOCALSTORAGE
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // INCREASE QTY
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  // DECREASE QTY
  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // TOTAL PRICE
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "15px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2 style={{ marginTop: "20px" }}>Total: ₹{total}</h2>

          <button
  onClick={() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    window.location.href = "/checkout";
  }}
  style={{
    marginTop: "15px",
    padding: "12px 20px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Proceed to Checkout
</button>

        </>
      )}
    </div>
  );
}
