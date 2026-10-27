import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function protectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default protectedRoute;