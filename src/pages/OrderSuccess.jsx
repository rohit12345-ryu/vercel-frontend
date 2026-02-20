import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders.length > 0) {
      setOrder(orders[orders.length - 1]);
    }
  }, []);

  if (!order) {
    return <p className="loading-text">No order found</p>;
  }

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <h1 className="success-title">Order Confirmed</h1>

        <p className="success-sub">
          Thank you <b>{order.customer.name}</b>, your order has been placed
          successfully.
        </p>

        <h3>Order Summary</h3>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="success-item"
          >
            <span>
              {item.name} x {item.qty}
            </span>
            <span>Rs {item.price * item.qty}</span>
          </div>
        ))}

        <hr style={{ margin: "14px 0" }} />

        <h2 className="success-total">Total Paid: Rs {order.total}</h2>

        <div className="delivery-box">
          <p>
            <b>Delivery Address:</b>
          </p>
          <p>
            {order.customer.address}, {order.customer.city} - {order.customer.pincode}
          </p>
          <p>Phone: {order.customer.phone}</p>
        </div>

        <div className="success-actions">
          <button
            onClick={() => navigate("/store")}
            className="success-primary"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/")}
            className="success-secondary"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
