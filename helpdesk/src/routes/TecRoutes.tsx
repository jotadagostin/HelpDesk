import { Route, Routes } from "react-router";
import { Technician } from "../pages/Technician/Technician";

export function TecRoutes() {
  return (
    <Routes>
      <Route index element={<Technician />} />
    </Routes>
  );
}
