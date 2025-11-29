/**
 * Booking Service - manages in-memory booking state
 * Can be extended to use Redux or Zustand for complex state management
 */

let bookingState = {
  appointments: [],
  currentBooking: null,
};

export const BookingService = {
  /**
   * Initialize appointments from localStorage or API
   */
  initializeAppointments: (appointments = []) => {
    bookingState.appointments = appointments;
  },

  /**
   * Add a new appointment to local state
   */
  addAppointment: (appointment) => {
    bookingState.appointments.push({
      ...appointment,
      id: appointment.id || `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
    return bookingState.appointments[bookingState.appointments.length - 1];
  },

  /**
   * Get all appointments
   */
  getAppointments: () => bookingState.appointments,

  /**
   * Get appointment by ID
   */
  getAppointmentById: (id) =>
    bookingState.appointments.find((apt) => apt.id === id),

  /**
   * Cancel appointment
   */
  cancelAppointment: (appointmentId) => {
    const index = bookingState.appointments.findIndex(
      (apt) => apt.id === appointmentId
    );
    if (index !== -1) {
      bookingState.appointments[index].status = "cancelled";
      return true;
    }
    return false;
  },

  /**
   * Update appointment (e.g., reschedule)
   */
  updateAppointment: (appointmentId, updates) => {
    const appointment = bookingState.appointments.find(
      (apt) => apt.id === appointmentId
    );
    if (appointment) {
      Object.assign(appointment, updates);
      return appointment;
    }
    return null;
  },

  /**
   * Get upcoming appointments
   */
  getUpcomingAppointments: () => {
    return bookingState.appointments.filter((apt) => apt.status !== "cancelled");
  },

  /**
   * Get past appointments
   */
  getPastAppointments: () => {
    return bookingState.appointments.filter(
      (apt) =>
        apt.status === "completed" ||
        (apt.status === "cancelled" && new Date(apt.date) < new Date())
    );
  },
};

export default BookingService;
