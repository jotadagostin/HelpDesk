import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
  role: string; // “ADMIN”, “TEC”, “CLIENT”
}

export function PrivateRoute({ children, role }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If you don't have a token → return to login
  if (!token) return <Navigate to="/" replace />;

  // If you don't have the correct role → block
  if (userRole !== role) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
}
