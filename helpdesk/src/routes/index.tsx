import { Route, Routes, useLocation } from "react-router";
import { LogIn } from "../pages/LogIn";
import { SignIn } from "../pages/SignIn";
import { AdminRoutes } from "./AdminRoutes";

export function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      {/* Public routes: */}
      <Route path="/" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
