import { Route, Routes } from "react-router";
import { Login } from "../pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
