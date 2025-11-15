import { Route, Routes, useLocation } from "react-router";
import { LogIn } from "../pages/LogIn";
import { SignIn } from "../pages/SignIn";
import { AdminRoutes } from "./AdminRoutes";
import { TecRoutes } from "./TecRoutes";
import { ClientsRoutes } from "./ClientRoutes";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      {/* Public routes: */}
      <Route path="/" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Admin Routes */}

      <Route
        path="/admin/*"
        element={
          <PrivateRoute role="ADMIN">
            <AdminRoutes />
          </PrivateRoute>
        }
      />

      {/* Technician Routes */}
      <Route
        path="/technician/*"
        element={
          <PrivateRoute role="TEC">
            <TecRoutes />
          </PrivateRoute>
        }
      />

      {/* Client Routes */}
      <Route
        path="/clients/*"
        element={
          <PrivateRoute role="CLIENT">
            <ClientsRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
