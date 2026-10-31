import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/contexts/authcontext";

/**
 * ProtectedRoute — only renders the child routes if the user is authenticated.
 * Otherwise redirects to /login.
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

/**
 * GuestRoute — only renders the child routes if the user is NOT authenticated.
 * Otherwise redirects to /dashboard. Used for /login and /register.
 */
export function GuestRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}