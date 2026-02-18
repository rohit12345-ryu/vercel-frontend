import AITrainer from "./pages/Aitrainer";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Nutrition from "./pages/Nutrition";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";



import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />

      <Toaster position="top-right" />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Contact & membership */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/membership" element={<Membership />} />

        {/* Protected app pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/programs" element={<Programs />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-trainer" element={<AITrainer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
