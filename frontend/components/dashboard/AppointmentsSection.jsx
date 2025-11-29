import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, User, X, AlertCircle } from "lucide-react";
import { BookingService } from "../../services/BookingService";
import { fetchPatientAppointments } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AppointmentsSection() {
  const { patient } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      // Fetch from backend (or mock if not implemented)
      const fetched = await fetchPatientAppointments(patient.id);
      const stored = BookingService.getAppointments();
      setAppointments([...fetched, ...stored]);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    setCanceling(true);
    try {
      BookingService.cancelAppointment(appointmentId);
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
        )
      );
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error canceling appointment:", error);
    } finally {
      setCanceling(false);
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === "confirmed" &&
      new Date(apt.date) > new Date()
  );
  const pastAppointments = appointments.filter(
    (apt) =>
      apt.status === "completed" ||
      (new Date(apt.date) <= new Date() && apt.status !== "cancelled")
  );
  const cancelledAppointments = appointments.filter(
    (apt) => apt.status === "cancelled"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mb-3" />
          <p className="text-gray-400">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-xl font-cinzel font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="text-green-400" size={24} />
          Upcoming Appointments ({upcomingAppointments.length})
        </h2>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <AlertCircle className="mx-auto text-green-400/50 mb-3" size={32} />
            <p className="text-gray-400">No upcoming appointments yet.</p>
            <p className="text-gray-500 text-sm mt-1">
              Book a therapy session to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onSelect={() => setSelectedAppointment(appointment)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-cinzel font-bold text-white mb-4">
            Past Appointments ({pastAppointments.length})
          </h2>
          <div className="grid gap-4 opacity-75">
            {pastAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isPast
                onSelect={() => setSelectedAppointment(appointment)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cancelled Appointments */}
      {cancelledAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-cinzel font-bold text-white mb-4">
            Cancelled Appointments ({cancelledAppointments.length})
          </h2>
          <div className="grid gap-4 opacity-50">
            {cancelledAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isCancelled
                onSelect={() => setSelectedAppointment(appointment)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onCancel={() => handleCancelAppointment(selectedAppointment.id)}
          canceling={canceling}
        />
      )}
    </div>
  );
}

/**
 * Appointment Card Component
 */
function AppointmentCard({
  appointment,
  isPast = false,
  isCancelled = false,
  onSelect,
}) {
  const therapyNames = {
    vamana: "Vamana",
    virechana: "Virechana",
    nasya: "Nasya",
    basti: "Basti",
  };

  const statusColors = {
    confirmed:
      "bg-green-500/20 text-green-400 border-green-500/30",
    completed:
      "bg-blue-500/20 text-blue-400 border-blue-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div
      onClick={onSelect}
      className="group bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-green-500/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Therapy Info */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Calendar size={18} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-lg text-white">
                {therapyNames[appointment.therapyId] || appointment.therapy}
              </h3>
              <p className="text-green-400/70 text-sm">
                {appointment.subtitle || "Panchakarma Therapy"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 ml-11">
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-green-400/60" />
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-green-400/60" />
              {appointment.time}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} className="text-green-400/60" />
              {appointment.practitionerName || "Dr. Sharma"}
            </span>
          </div>
        </div>

        {/* Right: Status Badge */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            statusColors[appointment.status] || statusColors.confirmed
          }`}>
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </div>
      </div>
    </div>
  );
}

/**
 * Appointment Details Modal
 */
function AppointmentModal({
  appointment,
  onClose,
  onCancel,
  canceling,
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 max-w-md w-full backdrop-blur-xl">
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-cinzel text-2xl font-bold text-white">
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <DetailRow
            icon={<Calendar size={16} />}
            label="Date"
            value={new Date(appointment.date).toLocaleDateString()}
          />
          <DetailRow
            icon={<Clock size={16} />}
            label="Time"
            value={appointment.time}
          />
          <DetailRow
            icon={<User size={16} />}
            label="Practitioner"
            value={appointment.practitionerName || "Dr. Sharma"}
          />
          <DetailRow
            icon={<MapPin size={16} />}
            label="Location"
            value={appointment.location || "Wellness Center, Kerala"}
          />
          <DetailRow
            icon={<span className="text-xs font-bold">₹</span>}
            label="Amount"
            value={`₹${appointment.price || 150}`}
          />
        </div>

        {appointment.status === "confirmed" && (
          <button
            onClick={onCancel}
            disabled={canceling}
            className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-all duration-300 font-medium disabled:opacity-50">
            {canceling ? "Canceling..." : "Cancel Appointment"}
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg transition-all duration-300 font-medium">
          Close
        </button>
      </div>
    </div>
  );
}

/**
 * Detail Row Component for Modal
 */
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
      <span className="text-green-400">{icon}</span>
      <div className="flex-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}
