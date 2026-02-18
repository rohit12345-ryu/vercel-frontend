import React, { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        if (!res.ok) throw new Error("Backend failed");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        // 🔁 fallback to localStorage
        const localOrders =
          JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(localOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading orders...</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id || order.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff",
            }}
          >
            <p>
              <b>Order ID:</b> {order._id || order.id}
            </p>
            <p>
              <b>Date:</b>{" "}
              {new Date(order.createdAt || order.date).toLocaleString()}
            </p>

            <hr style={{ margin: "10px 0" }} />

            {order.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                }}
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr style={{ margin: "10px 0" }} />

            <h3>Total: ₹{order.total}</h3>
          </div>
        ))
      )}
    </div>
  );
}
