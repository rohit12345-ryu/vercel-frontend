import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    return setError("Passwords do not match");
  }

  try {
    const res = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    console.log("REGISTER SUCCESS:", res.data);

    navigate("/login");

  } catch (err) {
    console.log("REGISTER ERROR:", err.response);
    setError(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Register to GYM AI</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff0000" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
