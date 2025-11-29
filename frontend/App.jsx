import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import PatientLogin from "./pages/patient_login";
import PractitionerLogin from "./pages/practioner_login";
import PractitionerDashboard from "./pages/PractionerDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/login/practitioner" element={<PractitionerLogin />} />
          <Route path="/dashboard_practitioner" element={<PractitionerDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
