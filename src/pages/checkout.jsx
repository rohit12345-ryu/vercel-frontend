import React, { useEffect, useState } from "react";

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
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 20, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 30 }}>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 25, background: "#fff" }}>
        <h2 style={{ marginBottom: 20 }}>Delivery Details</h2>
        {["name", "phone", "address", "city", "pincode"].map((field) => (
          <input key={field} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={form[field]} onChange={handleChange} style={{ width: "100%", padding: 12, marginBottom: 15, borderRadius: 6, border: "1px solid #d1d5db" }} />
        ))}
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 25, background: "#f9fafb" }}>
        <h2 style={{ marginBottom: 15 }}>Order Summary</h2>
        {cart.length === 0 ? <p>Your cart is empty</p> : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <hr style={{ margin: "15px 0" }} />
            <h3>Total: ₹{total}</h3>
            <button onClick={placeOrder} style={{ width: "100%", marginTop: 20, padding: 14, background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>Place Order</button>
          </>
        )}
      </div>
    </div>
  );
}
