import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  MessageCircle,
  Settings,
  LogOut,
  Plus,
  Zap,
} from "lucide-react";
import PatientNav from "../components/dashboard/PatientNav";
import AppointmentsSection from "../components/dashboard/AppointmentsSection";
import BookTherapySection from "../components/dashboard/BookTherapySection";
import AISymptomChecker from "../components/dashboard/AISymptomChecker";
import HealthMetrics from "../components/dashboard/HealthMetrics";
import CustomCursor from "../components/CustomCursor";

export default function PatientDashboard() {
  const { patient, logout, isAuthenticated, restoreSession } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    restoreSession();
    if (!isAuthenticated && !patient) {
      navigate("/login/patient");
    }
  }, []);

  if (!patient) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <CustomCursor />
      <div className="flex h-screen bg-black text-white overflow-hidden">
        {/* Sidebar */}
        <PatientNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          patient={patient}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 md:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-cinzel font-bold text-white">
                {activeTab === "appointments" && "My Appointments"}
                {activeTab === "book" && "Book a Therapy"}
                {activeTab === "ai" && "AI Therapy Assistant"}
                {activeTab === "health" && "Health Metrics"}
              </h1>
              <p className="text-green-400/60 text-sm mt-1">
                Welcome back, {patient.name}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-300 border border-red-500/20">
              <LogOut size={16} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            {activeTab === "appointments" && <AppointmentsSection />}
            {activeTab === "book" && <BookTherapySection />}
            {activeTab === "ai" && <AISymptomChecker />}
            {activeTab === "health" && <HealthMetrics />}
          </div>
        </main>
      </div>
    </>
  );
}
