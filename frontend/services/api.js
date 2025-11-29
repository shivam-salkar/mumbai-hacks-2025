/**
 * API Client - stub for future backend integration
 * Replace baseURL and implement actual HTTP calls when backend is ready
 */

const API_BASE_URL = "http://localhost:3000/api"; // Update when backend is deployed

/**
 * Check practitioner availability for a therapy on a given date
 * @param {string} therapyId - ID of the therapy
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<{available: boolean, slots: string[]}>}
 */
export const checkPractitionerAvailability = async (therapyId, date) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/practitioners/availability`, {
    //   method: 'POST',
    //   body: JSON.stringify({ therapyId, date })
    // });
    // return response.json();

    // Mock response for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          available: true,
          slots: ["09:00", "10:30", "14:00", "15:30", "16:45"],
        });
      }, 500);
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    throw error;
  }
};

/**
 * Book an appointment
 * @param {Object} bookingData - { therapyId, practitionerId, date, time, notes }
 * @returns {Promise<{success: boolean, bookingId: string}>}
 */
export const bookAppointment = async (bookingData) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/appointments`, {
    //   method: 'POST',
    //   body: JSON.stringify(bookingData)
    // });
    // return response.json();

    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          bookingId: `BOOKING-${Date.now()}`,
          appointment: {
            id: `BOOKING-${Date.now()}`,
            ...bookingData,
            status: "confirmed",
            createdAt: new Date().toISOString(),
          },
        });
      }, 800);
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

/**
 * Fetch patient's appointments
 * @param {string} patientId - ID of the patient
 * @returns {Promise<Array>}
 */
export const fetchPatientAppointments = async (patientId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/patients/${patientId}/appointments`);
    // return response.json();

    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

/**
 * Cancel an appointment
 * @param {string} appointmentId - ID of the appointment
 * @returns {Promise<{success: boolean}>}
 */
export const cancelAppointment = async (appointmentId) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
    //   method: 'DELETE'
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    throw error;
  }
};

/**
 * Submit symptoms to AI for therapy recommendation
 * @param {string} symptoms - Patient's symptoms description
 * @returns {Promise<{recommendedTherapyId: string, confidence: number, reasoning: string}>}
 */
export const getAITherapyRecommendation = async (symptoms) => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/ai/recommend-therapy`, {
    //   method: 'POST',
    //   body: JSON.stringify({ symptoms })
    // });
    // return response.json();

    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        const therapies = ["vamana", "virechana", "nasya", "basti"];
        const randomTherapy = therapies[Math.floor(Math.random() * therapies.length)];
        resolve({
          recommendedTherapyId: randomTherapy,
          confidence: 0.85,
          reasoning: "Based on your symptoms, this therapy appears most suitable.",
        });
      }, 1500);
    });
  } catch (error) {
    console.error("Error getting AI recommendation:", error);
    throw error;
  }
};

/**
 * Fetch all available therapies
 * @returns {Promise<Array>}
 */
export const fetchTherapies = async () => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/therapies`);
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "vamana",
            title: "Vamana",
            subtitle: "Therapeutic Emesis",
            duration: "45-60 mins",
            focus: "Kapha Disorders",
            desc: "Controlled vomiting to expel toxins from the upper respiratory and gastric tracts.",
            price: 150,
          },
          {
            id: "virechana",
            title: "Virechana",
            subtitle: "Medical Purgation",
            duration: "60-90 mins",
            focus: "Pitta Disorders",
            desc: "Therapeutic purgation to eliminate excessive heat and toxins from the liver.",
            price: 180,
          },
          {
            id: "nasya",
            title: "Nasya",
            subtitle: "Nasal Administration",
            duration: "30-45 mins",
            focus: "ENT Care",
            desc: "Instillation of herbal oils through nasal passages to clear head and neck channels.",
            price: 120,
          },
          {
            id: "basti",
            title: "Basti",
            subtitle: "Herbal Enema",
            duration: "40-60 mins",
            focus: "Vata Disorders",
            desc: "Medicated enema to balance the primary dosha and disperse deep-rooted toxins.",
            price: 160,
          },
        ]);
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching therapies:", error);
    throw error;
  }
};

/**
 * Fetch practitioner details
 * @param {string} practitionerId - ID of the practitioner
 * @returns {Promise<Object>}
 */
export const fetchPractitionerDetails = async (practitionerId) => {
  try {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: practitionerId,
          name: "Dr. Sharma",
          specialization: "Panchakarma",
          experience: 15,
          rating: 4.8,
          reviews: 42,
        });
      }, 300);
    });
  } catch (error) {
    console.error("Error fetching practitioner details:", error);
    throw error;
  }
};
