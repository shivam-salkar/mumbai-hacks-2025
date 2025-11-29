import {
  Calendar,
  Heart,
  MessageCircle,
  Zap,
  Menu,
  X,
  BarChart3,
} from "lucide-react";

export default function PatientNav({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  patient,
}) {
  const tabs = [
    {
      id: "appointments",
      label: "My Appointments",
      icon: Calendar,
    },
    {
      id: "book",
      label: "Book Therapy",
      icon: Heart,
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: Zap,
    },
    {
      id: "health",
      label: "Health Metrics",
      icon: BarChart3,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 border border-white/10">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-[#0a1410] to-black border-r border-white/10 p-6 flex flex-col transition-all duration-300 z-40 ${
          sidebarOpen ? "left-0" : "-left-64 md:left-0"
        }`}>
        {/* Logo/Branding */}
        <div className="mb-12 mt-8 md:mt-0">
          <h2 className="font-cinzel text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            SOUJANYA
          </h2>
          <p className="text-green-400/50 text-xs tracking-widest uppercase mt-1">
            Patient Portal
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 group ${
                  isActive
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}>
                <Icon
                  size={18}
                  className={`transition-all duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Patient Info */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center font-bold text-white">
                {patient.name?.charAt(0).toUpperCase() || "P"}
              </div>
              <div>
                <p className="font-medium text-sm text-white">
                  {patient.name || "Patient"}
                </p>
                <p className="text-xs text-green-400/60 truncate">
                  {patient.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
