import { Route, Routes } from "react-router";
import { Admin } from "../pages/Admin/Admin";
import { Tec } from "../pages/Admin/Tec";
import { Clients } from "../pages/Admin/Clients";
import { Services } from "../pages/Admin/Services";
import { CallsDetails } from "../pages/Admin/AdminDetails";
import { TecProfile } from "../pages/Admin/TecProfile";
import { TecProfileEdit } from "../pages/Admin/TecProfileEdit";

export function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<Admin />} />
      <Route path="tec" element={<Tec />} />
      <Route path="clients" element={<Clients />} />
      <Route path="services" element={<Services />} />
      <Route path="callsdetails/:id" element={<CallsDetails />} />
      <Route path="tecprofile/:id" element={<TecProfile />} />
      <Route path="tecprofileedit/:id" element={<TecProfileEdit />} />
    </Routes>
  );
}
