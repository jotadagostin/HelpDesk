import { Navigate } from "react-router";
import React from "react";

type PrivateRouteProps = {
  children: React.ReactNode;
  role: "ADMIN" | "TEC" | "CLIENT";
};

export function PrivateRoute({ children, role }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== role) {
    // Redireciona para login se não estiver autenticado ou role não coincidir
    return <Navigate to="/" replace />;
  }

  return children;
}
