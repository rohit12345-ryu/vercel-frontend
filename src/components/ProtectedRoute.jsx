import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  const token = localStorage.getItem("token");

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
