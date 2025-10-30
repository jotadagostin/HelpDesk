import { Route, Routes } from "react-router";
import { Clients } from "../pages/Client/Clients.tsx";
import { ClientsNewCall } from "../pages/Client/ClientsNewCall";
import { ClientsDetails } from "../pages/Client/ClientsDetails.tsx";

export function ClientsRoutes() {
  return (
    <Routes>
      <Route index element={<Clients />} />
      <Route path="details" element={<ClientsDetails />} />
      <Route path="newcall" element={<ClientsNewCall />} />
    </Routes>
  );
}
