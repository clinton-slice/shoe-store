import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/stores" element={<Stores />} />
  </Routes>
);

export default AppRoutes;
