import React, { useState } from 'react';
import { 
  Calendar, Clock, LayoutDashboard, Users, Bell, LogOut, FileText, 
  Activity, Video, TrendingUp, Edit, ClipboardList, BookOpen, Clock4, NotebookPen, Search, Plus, UserPlus
} from 'lucide-react';

// --- SHARED: Ambient Background & Styles ---
const AmbientBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0a0f0b]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1a2f1a] to-[#050806]" />
    {/* Subtle fluid animations for ambiance */}
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-[pulse_10s_infinite]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-[pulse_10s_infinite_2s]" />
  </div>
);

// Card component for aesthetic consistency
const DashboardCard = ({ title, icon, children, className = '', actions }) => (
  <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] ${className}`}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { size: 24, className: 'text-green-400' })}
        <h3 className="font-cinzel text-xl text-white">{title}</h3>
      </div>
      {actions && <div>{actions}</div>}
    </div>
    {children}
  </div>
);

// --- VIEW COMPONENTS ---

const ScheduleView = () => {
  const scheduleData = [
    { id: 1, name: "Aarav Patel", time: "09:30 AM", type: "Follow-up", duration: "45 min", status: "Confirmed", color: "text-green-400" },
    { id: 2, name: "Sarah Jenkins", time: "11:00 AM", type: "Initial Consult", duration: "60 min", status: "Confirmed", color: "text-blue-400" },
    { id: 3, name: "Priya Sharma", time: "02:15 PM", type: "Therapy Review", duration: "30 min", status: "Pending", color: "text-yellow-400" },
    { id: 4, name: "Vikram Singh", time: "03:00 PM", type: "Panchakarma Prep", duration: "45 min", status: "Cancelled", color: "text-red-400" },
    { id: 5, name: "Emily D.", time: "04:30 PM", type: "Diet Counseling", duration: "30 min", status: "Confirmed", color: "text-green-400" },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="font-cinzel text-3xl md:text-4xl text-white">Appointment Schedule</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your weekly consultation slots and patient timings.</p>
      </header>
      <DashboardCard 
        title="Today: Monday, Nov 29" 
        icon={<Calendar />}
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl text-sm hover:bg-green-500/30 transition-all">
            <Plus size={16} /> New Slot
          </button>
        }
      >
        <div className="bg-white/5 p-4 rounded-xl mb-4 flex justify-between text-white font-medium">
          <span>Upcoming 5 Appointments</span>
          <span className="text-green-300">Total 5 Appointments</span>
        </div>
        <div className="space-y-3">
          {scheduleData.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:border-green-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className={`text-xl font-bold ${item.color}`}>{item.time.split(':')[0]}</div>
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{item.type} • {item.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : item.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                  {item.status}
                </span>
                <button className="p-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/30 transition-all">
                  <Video size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
      
      {/* Additional feature for demonstration */}
      <DashboardCard title="Timezone Settings" icon={<Clock4 />}>
        <p className="text-sm text-gray-400">Your current consultation timezone is set to **IST (Asia/Kolkata)**. All times are displayed relative to this.</p>
        <button className="mt-4 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10">
          Adjust Timezone
        </button>
      </DashboardCard>
    </div>
  );
};

const PatientsView = () => {
  const patientsData = [
    { id: 101, name: "Aarav Patel", dosha: "Vata-Pitta", lastVisit: "Today", status: "Active", risk: "Medium" },
    { id: 102, name: "Sarah Jenkins", dosha: "Kapha", lastVisit: "1 week ago", status: "New Intake", risk: "Low" },
    { id: 103, name: "Priya Sharma", dosha: "Tridoshic", lastVisit: "3 days ago", status: "Active", risk: "High" },
    { id: 104, name: "Vikram Singh", dosha: "Pitta", lastVisit: "1 month ago", status: "Follow-up", risk: "Medium" },
    { id: 105, name: "Maria Lopez", dosha: "Vata", lastVisit: "2 weeks ago", status: "Active", risk: "Low" },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="font-cinzel text-3xl md:text-4xl text-white">My Patient Roster</h1>
        <p className="text-gray-400 text-sm mt-1">Review patient charts, track progress, and manage intake forms.</p>
      </header>
      <DashboardCard 
        title="Active Patient List (5 Total)" 
        icon={<Users />}
        actions={
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="relative w-full sm:w-auto">
              <input type="text" placeholder="Search Patients..." className="w-full bg-white/5 border border-white/10 p-2 pl-10 rounded-xl text-sm text-white focus:outline-none focus:border-green-400 transition-colors" />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-xl text-sm hover:bg-blue-500/30 transition-all">
              <UserPlus size={16} /> New Patient
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-400">
            <thead>
              <tr className="uppercase text-xs text-gray-500 border-b border-white/10">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 hidden sm:table-cell">Primary Dosha</th>
                <th className="py-3 px-4 hidden md:table-cell">Last Visit</th>
                <th className="py-3 px-4">Risk</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientsData.map((patient) => (
                <tr key={patient.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-white font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-700/50 flex items-center justify-center text-xs">{patient.name.charAt(0)}</div>
                    {patient.name}
                  </td>
                  <td className="py-4 px-4 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${patient.dosha.includes('Vata') ? 'bg-purple-500/20 text-purple-400' : patient.dosha.includes('Pitta') ? 'bg-orange-500/20 text-orange-400' : 'bg-sky-500/20 text-sky-400'}`}>
                      {patient.dosha}
                    </span>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">{patient.lastVisit}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${patient.risk === 'High' ? 'text-red-400 bg-red-500/10' : patient.risk === 'Medium' ? 'text-yellow-400 bg-yellow-500/10' : 'text-green-400 bg-green-500/10'}`}>
                      {patient.risk}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-sm text-green-400 hover:text-white transition-colors">View Chart</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

// --- PRACTITIONER DASHBOARD (Standalone Page) ---
const PractitionerDashboard = () => {
  // State for view switching, initialized to 'Dashboard'
  const [currentView, setCurrentView] = useState('Dashboard'); 

  // Mock Data (Only used if currentView === 'Dashboard')
  const stats = [
    { title: 'Today\'s Appointments', value: '04', icon: Calendar, trend: '+2 this week', color: 'text-green-400' },
    { title: 'Pending Requests', value: '03', icon: Bell, trend: 'Urgent attention', color: 'text-yellow-400' },
    { title: 'Total Active Patients', value: '142', icon: Users, trend: '+12 new', color: 'text-blue-400' },
    { title: 'Consultation Minutes', value: '345', icon: Clock4, trend: 'Past 7 days', color: 'text-purple-400' },
  ];

  const appointments = [
    { id: 1, name: "Aarav Patel", time: "09:30 AM", type: "Follow-up", status: "In 10 min", color: "bg-green-500/10", icon: Video },
    { id: 2, name: "Sarah Jenkins", time: "11:00 AM", type: "Initial Consult", status: "Scheduled", color: "bg-blue-500/10", icon: Video },
    { id: 3, name: "Priya Sharma", time: "02:15 PM", type: "Therapy Review", status: "Scheduled", color: "bg-purple-500/10", icon: ClipboardList },
  ];
  
  const requests = [
    { id: 1, name: "Rahul V.", issue: "Chronic Migraine", date: "Requested today" },
    { id: 2, name: "Emily D.", issue: "Pitta Imbalance", date: "Requested yesterday" },
  ];

  // Helper function to render the correct view component
  const renderView = () => {
    // Render header only for the main dashboard view
    const mainHeader = currentView === 'Dashboard' && (
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-cinzel text-3xl md:text-4xl text-white">Dashboard Overview</h1>
          <p className="text-green-400/60 text-sm tracking-widest uppercase mt-1">Dr. Aryaman: Welcome to your static practice view.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-800 border-2 border-white/20 shadow-lg cursor-pointer transform hover:scale-105 transition-transform" />
          <div className="md:hidden p-2 rounded-full bg-gray-500/10 text-gray-400"><LogOut size={20} /></div>
        </div>
      </header>
    );

    switch (currentView) {
      case 'Dashboard':
        return (
          <>
            {mainHeader}
            {/* 4-Grid Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:bg-white/[0.07] group cursor-pointer transform hover:translate-y-[-4px]">
                  <div className="flex justify-between items-center mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>{React.createElement(stat.icon, { size: 24 })}</div>
                    <TrendingUp size={20} className="text-green-400/70" />
                  </div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-green-300 text-xs mt-2">{stat.trend}</p>
                </div>
              ))}
            </div>
            
            {/* Main Dashboard Grid (lg:grid-cols-3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1 & 2 (Main Content, spans 2/3rds) */}
              <div className="lg:col-span-2 space-y-6">

                {/* Today's Appointments Card (Large Card) */}
                <DashboardCard title="Today's Sessions" icon={<Calendar />} className="min-h-[300px]">
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className={`flex items-center justify-between p-4 rounded-xl ${apt.color} border border-white/5 hover:border-green-500/30 transition-all group`}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-green-700/50">
                            {apt.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{apt.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                              <Clock size={12} /> {apt.time} • <span className="text-green-300/80">{apt.type}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button className="flex items-center gap-2 p-2 rounded-full bg-green-500/20 text-green-400 text-xs hover:bg-green-500 hover:text-white transition-all transform group-hover:scale-105">
                          <Video size={18} /> <span className='hidden sm:inline'>Start</span>
                        </button>
                      </div>
                    ))}
                    <button 
                      className="w-full py-2 text-sm text-green-400 hover:text-white transition-colors border-t border-white/10 mt-4" 
                      onClick={() => setCurrentView('Schedule')} // Link to Schedule View
                    >
                        See Full Schedule
                    </button>
                  </div>
                </DashboardCard>

                {/* Patient Progress/Vitals Tracking (Brownie Point: Mock Visualization) */}
                <DashboardCard title="Vitals Trend (Last 30 Days)" icon={<Activity />} className="relative overflow-hidden">
                    <div className="text-xs text-gray-400 mb-6">Monitoring key patient vitals and health markers post-Panchakarma.</div>
                    <div className="h-64 flex flex-col justify-end p-2 border-l border-b border-white/20">
                        {/* Mock Graph Area */}
                        <div className="relative h-full w-full">
                            {/* Grid lines */}
                            {[0, 25, 50, 75, 100].map(p => (
                                <div key={p} className="absolute left-0 w-full h-px bg-white/5" style={{ bottom: `${p}%` }} />
                            ))}
                            
                            {/* Mock Data Lines */}
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute top-0 left-0">
                                {/* Vata (Dashed Purple) */}
                                <polyline fill="none" stroke="url(#gradientVata)" strokeWidth="1" strokeDasharray="2, 2" points="5,80 25,65 45,70 65,55 85,60 95,50" />
                                {/* Pitta (Solid Orange) */}
                                <polyline fill="none" stroke="url(#gradientPitta)" strokeWidth="1.5" points="5,50 25,40 45,30 65,35 85,20 95,25" />
                                
                                <defs>
                                    <linearGradient id="gradientVata" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor:'rgb(168,85,247)', stopOpacity:1}} />
                                        <stop offset="100%" style={{stopColor:'rgb(168,85,247)', stopOpacity:0.5}} />
                                    </linearGradient>
                                    <linearGradient id="gradientPitta" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor:'rgb(251,146,60)', stopOpacity:1}} />
                                        <stop offset="100%" style={{stopColor:'rgb(251,146,60)', stopOpacity:0.5}} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-end gap-6 mt-4 text-xs">
                        <div className="flex items-center gap-1 text-purple-400"><div className="w-2 h-2 rounded-full bg-purple-400" /> Vata Index</div>
                        <div className="flex items-center gap-1 text-orange-400"><div className="w-2 h-2 rounded-full bg-orange-400" /> Pitta Index</div>
                    </div>
                </DashboardCard>

              </div>

              {/* Column 3 (Sidebar, fixed width on large screens) */}
              <div className="lg:col-span-1 space-y-6">

                {/* Practitioner Profile Card */}
                <div className="bg-gradient-to-br from-green-900/40 to-[#0a0f0b] border border-green-500/30 rounded-[1.5rem] p-6 text-center transition-all hover:bg-green-900/50">
                  <div className="w-24 h-24 mx-auto rounded-full bg-white/10 mb-4 border-4 border-green-400/50 p-1">
                    <div className="w-full h-full rounded-full bg-gray-700 bg-[url('https://placehold.co/80x80/22c55e/ffffff/webp?text=Dr')] bg-cover" />
                  </div>
                  <h3 className="text-white font-cinzel text-xl">Dr. Aryaman Sharma</h3>
                  <p className="text-xs text-green-300/80 mb-1">B.A.M.S, M.D. (Kayachikitsa)</p>
                  <p className="text-xs text-gray-400 mb-4">Senior Consultant at Soujanya Wellness</p>
                  <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors flex items-center justify-center gap-2">
                    <Edit size={16} /> Update Bio
                  </button>
                </div>

                {/* Pending Requests Card */}
                <DashboardCard title="Patient Intake Queue" icon={<Bell />} className="bg-yellow-900/20 border-yellow-500/20">
                  <div className="space-y-4">
                    {requests.map((req) => (
                      <div key={req.id} className="p-3 rounded-xl bg-black/30 border border-yellow-500/10">
                        <h4 className="text-white text-sm font-medium">{req.name}</h4>
                        <p className="text-xs text-yellow-300/80 mb-3">Issue: {req.issue}</p>
                        <button className="w-full py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs hover:bg-yellow-500/30 transition-all flex items-center justify-center gap-1">
                          <BookOpen size={12} /> Review Profile
                        </button>
                      </div>
                    ))}
                    
                    <div className="p-2 rounded-xl border border-dashed border-white/10 text-center text-xs text-gray-500 cursor-pointer hover:border-green-500/30 hover:text-green-400 transition-colors" onClick={() => setCurrentView('Patients')}>
                        See 14 more requests
                    </div>
                  </div>
                </DashboardCard>

                {/* Quick Notes Card (Brownie Point: Utility) */}
                <DashboardCard title="Quick Note Pad" icon={<NotebookPen />} className="bg-blue-900/20 border-blue-500/20">
                  <textarea 
                      placeholder="Draft quick observations, reminders, or protocol ideas here..."
                      className="w-full h-32 bg-black/30 border border-white/10 p-3 rounded-xl text-sm text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                      defaultValue="Reminder: Review Vata diet protocol for Aarav P. before 09:30 session."
                  />
                  <button className="mt-3 w-full py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/30 transition-colors">
                    Save Note
                  </button>
                </DashboardCard>
              </div>
            </div>
          </>
        );
      case 'Schedule':
        return <ScheduleView />;
      case 'Patients':
        return <PatientsView />;
      default:
        return null;
    }
  };

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' },
    { icon: Calendar, label: 'Schedule', view: 'Schedule' },
    { icon: Users, label: 'Patients', view: 'Patients' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0f0b]">
      <AmbientBackground />
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-20 lg:w-64 bg-white/5 border-r border-white/10 flex-shrink-0 flex md:flex-col items-center py-4 md:py-8 z-20">
        <div className="mb-0 md:mb-12 px-4 hidden md:block">
           <h1 className="font-cinzel text-2xl font-bold text-green-400 tracking-wider">S.</h1>
        </div>
        
        <nav className="flex md:flex-col gap-2 w-full px-2 justify-around md:justify-start">
          {navigationItems.map((item, idx) => (
            // Use onClick to change the current view state
            <button 
              key={idx} 
              onClick={() => setCurrentView(item.view)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all w-full ${item.view === currentView ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={20} />
              <span className="hidden lg:block text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout button removed as requested, replaced with a placeholder */}
        <div className="mt-auto hidden md:flex items-center gap-3 p-3 text-gray-500/70 mx-4">
          <LogOut size={20} />
          <span className="hidden lg:block text-sm">Offline Mode</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Render the appropriate view based on state */}
        {renderView()} 
      </main>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT (Directly renders Dashboard) ---
export default function App() {
  return (
    <div className="font-sans text-white min-h-screen">
      <style>{`
        /* Global Styles and Animations */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(74, 222, 128, 0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(74, 222, 128, 0.4); }
      `}</style>

      <PractitionerDashboard />
    </div>
  );
}