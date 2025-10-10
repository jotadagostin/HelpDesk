import { Route, Routes, useLocation } from "react-router";

import { LogIn } from "../pages/LogIn";
import { SignIn } from "../pages/SignIn";

export function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
