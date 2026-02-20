import React, { useEffect, useState } from "react";
import "./Checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });

  useEffect(() => { setCart(JSON.parse(localStorage.getItem("cart")) || []); }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) { alert("Please fill all delivery details"); return; }
    try {
      await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify({ items: cart, total, customer: form }) });
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push({ id: Date.now(), items: cart, total, customer: form, date: new Date().toISOString() });
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.removeItem("cart");
      window.location.href = "/order-success";
    } catch (error) { alert("Something went wrong. Please try again."); console.error(error); }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-panel">
        <h2>Delivery Details</h2>
        {[
          "name",
          "phone",
          "address",
          "city",
          "pincode",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="checkout-input"
          />
        ))}
      </div>

      <div className="checkout-panel">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="summary-row">
                <span>{item.name} x {item.qty}</span>
                <span>Rs {item.price * item.qty}</span>
              </div>
            ))}
            <hr style={{ margin: "12px 0" }} />
            <h3>Total: Rs {total}</h3>
            <button onClick={placeOrder} className="place-order-btn">Place Order</button>
          </>
        )}
      </div>
    </div>
  );
}
