import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import PractitionerDashboard from "./pages/PractionerDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard_patient" element={<PatientDashboard />} />
          <Route path="/dashboard_practitioner" element={<PractitionerDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
