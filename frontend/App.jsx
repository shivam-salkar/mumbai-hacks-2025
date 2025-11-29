import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PractitionerDashboard from "./pages/PractionerDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard_practitioner" element={<PractitionerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
