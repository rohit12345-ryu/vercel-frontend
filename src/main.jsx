import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="963478621491-vor6js6h1apmqdaklek743beenkrqv61.apps.googleusercontent.com">

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
