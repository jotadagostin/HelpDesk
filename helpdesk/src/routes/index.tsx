import { Route, Routes, useLocation } from "react-router";
import { LogIn } from "../pages/LogIn";
import { SignIn } from "../pages/SignIn";
import { Admin } from "../pages/Admin/Admin";
import { Tec } from "../pages/Admin/Tec";
import { Clients } from "../pages/Admin/Clients";
import { Services } from "../pages/Admin/Services";
import { CallsDetails } from "../pages/Admin/AdminDetails";
import { TecProfile } from "../pages/Admin/TecProfile";
import { TecProfileEdit } from "../pages/Admin/TecProfileEdit";

export function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/tec" element={<Tec />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/services" element={<Services />} />
      <Route path="/callsdetails" element={<CallsDetails />} />
      <Route path="/tecprofile" element={<TecProfile />} />
      <Route path="/tecprofileedit" element={<TecProfileEdit />} />
    </Routes>
  );
}
