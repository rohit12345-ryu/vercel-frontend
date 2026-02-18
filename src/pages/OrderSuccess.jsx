import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length > 0) {
      setOrder(orders[orders.length - 1]); // latest order
    }
  }, []);

  if (!order) {
    return <p style={{ textAlign: "center" }}>No order found</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "30px",
          background: "#fff",
        }}
      >
        <h1 style={{ color: "#16a34a", marginBottom: "10px" }}>
          ✅ Order Confirmed
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "25px" }}>
          Thank you <b>{order.customer.name}</b>, your order has been placed
          successfully.
        </p>

        {/* ORDER DETAILS */}
        <h3>Order Summary</h3>

        {order.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <hr style={{ margin: "15px 0" }} />

        <h2>Total Paid: ₹{order.total}</h2>

        {/* DELIVERY INFO */}
        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <p>
            <b>Delivery Address:</b>
          </p>
          <p>
            {order.customer.address}, {order.customer.city} –{" "}
            {order.customer.pincode}
          </p>
          <p>📞 {order.customer.phone}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
          <button
            onClick={() => navigate("/store")}
            style={{
              padding: "12px 20px",
              background: "#0f172a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 20px",
              background: "#e5e7eb",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
