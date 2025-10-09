import { Route, Routes } from "react-router";
import { LogIn } from "../pages/Login";
import { SignIn } from "../pages/SignIn";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
