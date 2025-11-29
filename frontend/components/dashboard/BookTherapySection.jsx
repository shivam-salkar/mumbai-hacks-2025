import { useState, useEffect } from "react";
import {
  Heart,
  Clock,
  Calendar,
  ChevronRight,
  Check,
  Loader,
  AlertCircle,
} from "lucide-react";
import {
  fetchTherapies,
  checkPractitionerAvailability,
  bookAppointment,
} from "../../services/api";
import { BookingService } from "../../services/BookingService";
import { useAuth } from "../../context/AuthContext";

const BOOKING_STEPS = {
  THERAPY_SELECTION: 1,
  DATE_TIME_SELECTION: 2,
  PRACTITIONER_SELECTION: 3,
  CONFIRMATION: 4,
};

export default function BookTherapySection() {
  const { patient } = useAuth();
  const [currentStep, setCurrentStep] = useState(BOOKING_STEPS.THERAPY_SELECTION);
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [practitionerNote, setPractitionerNote] = useState("");
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    loadTherapies();
  }, []);

  const loadTherapies = async () => {
    setLoading(true);
    try {
      const data = await fetchTherapies();
      setTherapies(data);
    } catch (error) {
      console.error("Error loading therapies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTherapy = (therapy) => {
    setSelectedTherapy(therapy);
    setCurrentStep(BOOKING_STEPS.DATE_TIME_SELECTION);
    setBookingError(null);
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setAvailableSlots([]);
    setCheckingAvailability(true);

    try {
      const response = await checkPractitionerAvailability(
        selectedTherapy.id,
        date
      );
      setAvailableSlots(response.slots || []);
    } catch (error) {
      setBookingError("Could not check availability. Try again.");
      console.error("Error checking availability:", error);
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleSelectTimeSlot = (time) => {
    setSelectedTime(time);
  };

  const handleProceedToConfirmation = () => {
    if (selectedTime) {
      setCurrentStep(BOOKING_STEPS.CONFIRMATION);
    }
  };

  const handleConfirmBooking = async () => {
    setBookingInProgress(true);
    setBookingError(null);

    try {
      const bookingData = {
        patientId: patient.id,
        therapyId: selectedTherapy.id,
        date: selectedDate,
        time: selectedTime,
        therapy: selectedTherapy.title,
        subtitle: selectedTherapy.subtitle,
        duration: selectedTherapy.duration,
        price: selectedTherapy.price,
        notes: practitionerNote,
        status: "confirmed",
        practitionerName: "Dr. Sharma", // Mock - will come from backend
      };

      const response = await bookAppointment(bookingData);

      if (response.success) {
        // Add to local state
        BookingService.addAppointment(response.appointment);

        // Show success and reset
        alert("Appointment booked successfully!");
        resetBooking();
      } else {
        setBookingError("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      setBookingError("An error occurred while booking. Please try again.");
      console.error("Error booking appointment:", error);
    } finally {
      setBookingInProgress(false);
    }
  };

  const resetBooking = () => {
    setCurrentStep(BOOKING_STEPS.THERAPY_SELECTION);
    setSelectedTherapy(null);
    setSelectedDate("");
    setSelectedTime("");
    setAvailableSlots([]);
    setPractitionerNote("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader className="mx-auto mb-3 animate-spin text-green-400" />
          <p className="text-gray-400">Loading therapies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} />

      {/* Step 1: Therapy Selection */}
      {currentStep === BOOKING_STEPS.THERAPY_SELECTION && (
        <TherapySelectionStep
          therapies={therapies}
          onSelect={handleSelectTherapy}
        />
      )}

      {/* Step 2: Date & Time Selection */}
      {currentStep === BOOKING_STEPS.DATE_TIME_SELECTION && selectedTherapy && (
        <DateTimeSelectionStep
          therapy={selectedTherapy}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          availableSlots={availableSlots}
          checkingAvailability={checkingAvailability}
          onDateChange={handleDateChange}
          onTimeSelect={handleSelectTimeSlot}
          onBack={() => setCurrentStep(BOOKING_STEPS.THERAPY_SELECTION)}
          onNext={handleProceedToConfirmation}
          bookingError={bookingError}
        />
      )}

      {/* Step 3: Confirmation */}
      {currentStep === BOOKING_STEPS.CONFIRMATION && selectedTherapy && (
        <ConfirmationStep
          therapy={selectedTherapy}
          date={selectedDate}
          time={selectedTime}
          note={practitionerNote}
          onNoteChange={setPractitionerNote}
          onBack={() => setCurrentStep(BOOKING_STEPS.DATE_TIME_SELECTION)}
          onConfirm={handleConfirmBooking}
          bookingInProgress={bookingInProgress}
          bookingError={bookingError}
        />
      )}
    </div>
  );
}

/**
 * Progress Indicator Component
 */
function ProgressIndicator({ currentStep }) {
  const steps = ["Therapy", "Date & Time", "Review", "Confirm"];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              index + 1 <= currentStep
                ? "bg-green-500 text-black"
                : "bg-white/10 text-gray-400"
            }`}>
            {index + 1 < currentStep ? (
              <Check size={20} />
            ) : (
              index + 1
            )}
          </div>
          <span
            className={`ml-2 text-sm font-medium transition-all duration-300 ${
              index + 1 <= currentStep ? "text-green-400" : "text-gray-500"
            }`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${
                index + 1 < currentStep
                  ? "bg-green-500"
                  : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Therapy Selection Step
 */
function TherapySelectionStep({ therapies, onSelect }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-cinzel font-bold text-white mb-6">
        Select a Therapy
      </h2>

      <div className="grid gap-4">
        {therapies.map((therapy) => (
          <div
            key={therapy.id}
            onClick={() => onSelect(therapy)}
            className="group bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 hover:border-green-500/40 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-cinzel font-bold text-lg text-white mb-1">
                  {therapy.title}
                </h3>
                <p className="text-green-400/70 text-sm mb-3">
                  {therapy.subtitle}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {therapy.desc}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-green-400/60" />
                    {therapy.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="text-green-400/60" />
                    {therapy.focus}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-green-400">
                    ₹{therapy.price}
                  </span>
                </div>
              </div>

              <ChevronRight className="text-green-400/50 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Date & Time Selection Step
 */
function DateTimeSelectionStep({
  therapy,
  selectedDate,
  selectedTime,
  availableSlots,
  checkingAvailability,
  onDateChange,
  onTimeSelect,
  onBack,
  onNext,
  bookingError,
}) {
  // Generate next 30 days
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
          <p className="text-green-300 font-medium">{therapy.title}</p>
          <p className="text-green-400/70 text-sm">{therapy.subtitle}</p>
        </div>

        <h3 className="text-lg font-cinzel font-bold text-white mb-4">
          Select Date
        </h3>

        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {dates.map((date) => {
            const dateObj = new Date(date);
            const isSelected = selectedDate === date;

            return (
              <button
                key={date}
                onClick={() => onDateChange(date)}
                className={`p-3 rounded-lg transition-all duration-300 text-center text-xs font-medium ${
                  isSelected
                    ? "bg-green-500 text-black border border-green-400"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:border-green-500/50"
                }`}>
                <div className="font-bold">
                  {dateObj.getDate()}
                </div>
                <div className="text-[10px] opacity-70">
                  {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Time Slots */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-cinzel font-bold text-white mb-4">
            Select Time
          </h3>

          {checkingAvailability ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="animate-spin text-green-400 mr-2" />
              <span className="text-gray-400">Checking availability...</span>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onTimeSelect(slot)}
                  className={`p-3 rounded-lg transition-all duration-300 font-medium text-sm ${
                    selectedTime === slot
                      ? "bg-green-500 text-black border border-green-400"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:border-green-500/50"
                  }`}>
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-yellow-400 text-sm">
              No slots available for this date. Please select another date.
            </div>
          )}
        </div>
      )}

      {bookingError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{bookingError}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-all duration-300 font-medium">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTime}
          className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/**
 * Confirmation Step
 */
function ConfirmationStep({
  therapy,
  date,
  time,
  note,
  onNoteChange,
  onBack,
  onConfirm,
  bookingInProgress,
  bookingError,
}) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-cinzel font-bold text-white">
        Confirm Your Booking
      </h2>

      {/* Booking Summary */}
      <div className="bg-gradient-to-b from-green-500/10 to-green-500/5 border border-green-500/30 rounded-2xl p-6 space-y-4">
        <SummaryRow label="Therapy" value={therapy.title} />
        <SummaryRow label="Duration" value={therapy.duration} />
        <SummaryRow label="Date" value={formattedDate} />
        <SummaryRow label="Time" value={time} />
        <div className="pt-4 border-t border-green-500/20">
          <SummaryRow
            label="Price"
            value={`₹${therapy.price}`}
            highlight
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Share any specific concerns or preferences with your practitioner..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none h-24"
        />
      </div>

      {bookingError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{bookingError}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={onBack}
          disabled={bookingInProgress}
          className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-all duration-300 font-medium disabled:opacity-50">
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={bookingInProgress}
          className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {bookingInProgress ? (
            <>
              <Loader size={18} className="animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Check size={18} />
              Confirm & Book
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Summary Row Component
 */
function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`font-medium ${highlight ? "text-green-300" : "text-gray-300"}`}>
        {label}
      </span>
      <span className={`font-bold ${highlight ? "text-green-400 text-lg" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
