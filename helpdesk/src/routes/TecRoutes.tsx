import { Route, Routes } from "react-router";
import { Technician } from "../pages/Technician/Technician";
import { TechnicianDetails } from "../pages/Technician/TechnicianDetails";

export function TecRoutes() {
  return (
    <Routes>
      <Route index element={<Technician />} />
      <Route path="details" element={<TechnicianDetails />} />
    </Routes>
  );
}
