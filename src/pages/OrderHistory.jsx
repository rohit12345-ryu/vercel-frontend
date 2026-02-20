import React, { useEffect, useState } from "react";
import "./OrderHistory.css";

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
        const localOrders =
          JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(localOrders);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading orders...</p>;

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <p className="empty-orders">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id || order.id}
            className="order-card"
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
                className="order-item"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>Rs {item.price * item.qty}</span>
              </div>
            ))}

            <hr style={{ margin: "10px 0" }} />

            <h3 className="order-total">Total: Rs {order.total}</h3>
          </div>
        ))
      )}
    </div>
  );
}
