import api from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ ADD Link
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // Save token & user via context
      login(res.data.token, res.data.user);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };


  // 🔐 GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // store token only for google flow (user info not provided by this demo)
      login(credentialResponse.credential, null);
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login to GYM AI</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <hr style={{ margin: "20px 0" }} />

        {/* 🔐 GOOGLE BUTTON */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google login failed")}
        />

        {/* ✅ REGISTER LINK (ADD HERE) */}
        <p style={{ marginTop: "15px", color: "#aaa", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#ff0000" }}>
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;
