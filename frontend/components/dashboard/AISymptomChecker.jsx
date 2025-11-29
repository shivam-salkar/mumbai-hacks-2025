import { useState } from "react";
import {
  Zap,
  Send,
  AlertCircle,
  CheckCircle,
  Loader,
  Heart,
  Brain,
  Activity,
} from "lucide-react";
import { getAITherapyRecommendation, fetchTherapies } from "../../services/api";

const SYMPTOM_SUGGESTIONS = [
  "Constant headaches and neck stiffness",
  "Chronic stress and anxiety",
  "Digestive issues and bloating",
  "Joint pain and muscle stiffness",
  "Fatigue and low energy",
  "Skin problems and allergies",
  "Insomnia and sleep disorders",
  "High blood pressure",
];

export default function AISymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [therapies, setTherapies] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      setError("Please describe your symptoms.");
      return;
    }

    setLoading(true);
    setError(null);
    setSubmitted(true);

    try {
      // Get AI recommendation
      const aiResult = await getAITherapyRecommendation(symptoms);

      // Fetch all therapies
      const allTherapies = await fetchTherapies();
      setTherapies(allTherapies);

      // Find recommended therapy
      const recommendedTherapy = allTherapies.find(
        (t) => t.id === aiResult.recommendedTherapyId
      );

      setRecommendation({
        ...aiResult,
        therapy: recommendedTherapy,
      });
    } catch (err) {
      setError("Failed to analyze symptoms. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms("");
    setRecommendation(null);
    setError(null);
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex gap-3 items-start">
          <Brain className="text-purple-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-white mb-1">AI-Powered Analysis</h3>
            <p className="text-gray-300 text-sm">
              Describe your symptoms, and our AI will recommend the most suitable
              Panchakarma therapy based on Ayurvedic principles. This is a
              preliminary assessment and should be confirmed with our practitioners.
            </p>
          </div>
        </div>
      </div>

      {!submitted ? (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Describe Your Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., I have been experiencing constant headaches, neck stiffness, and stress for the past month. I feel fatigued throughout the day..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none h-32"
            />
          </div>

          {/* Quick Suggestions */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Quick Suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_SUGGESTIONS.slice(0, 4).map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setSymptoms(
                      symptoms
                        ? `${symptoms}. ${suggestion}`
                        : suggestion
                    )
                  }
                  className="px-3 py-1 text-xs bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 rounded-full text-gray-300 hover:text-purple-300 transition-all duration-300">
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 font-bold disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap size={18} />
                Get AI Recommendation
              </>
            )}
          </button>
        </form>
      ) : recommendation ? (
        /* Recommendation Result */
        <RecommendationResult
          recommendation={recommendation}
          symptoms={symptoms}
          onReset={handleReset}
        />
      ) : null}
    </div>
  );
}

/**
 * Recommendation Result Component
 */
function RecommendationResult({ recommendation, symptoms, onReset }) {
  const { therapy, confidence, reasoning } = recommendation;

  const confidenceColor =
    confidence > 0.8
      ? "text-green-400"
      : confidence > 0.6
      ? "text-yellow-400"
      : "text-orange-400";

  const confidenceBarColor =
    confidence > 0.8 ? "bg-green-500" : confidence > 0.6 ? "bg-yellow-500" : "bg-orange-500";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Success Message */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-green-400 mb-1">Analysis Complete</p>
          <p className="text-green-400/70 text-sm">
            Based on your symptoms, we have identified a suitable therapy for you.
          </p>
        </div>
      </div>

      {/* Your Symptoms */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-2">
          Your Reported Symptoms
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-gray-300 text-sm leading-relaxed">{symptoms}</p>
        </div>
      </div>

      {/* Recommended Therapy */}
      {therapy && (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-green-400/70 uppercase tracking-wider font-semibold mb-1">
                Recommended Therapy
              </p>
              <h2 className="font-cinzel text-3xl font-bold text-white mb-2">
                {therapy.title}
              </h2>
              <p className="text-green-400/80 font-medium mb-4">
                {therapy.subtitle}
              </p>
            </div>
            <Heart className="text-green-400 flex-shrink-0" size={32} />
          </div>

          <p className="text-gray-300 leading-relaxed text-sm">
            {therapy.desc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-green-500/20">
            <TherapyDetail label="Duration" value={therapy.duration} />
            <TherapyDetail label="Focuses On" value={therapy.focus} />
            <TherapyDetail label="Investment" value={`₹${therapy.price}`} />
          </div>
        </div>
      )}

      {/* Confidence Score */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-300">
            Analysis Confidence
          </p>
          <span className={`font-bold ${confidenceColor}`}>
            {Math.round(confidence * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${confidenceBarColor}`}
            style={{ width: `${confidence * 100}%` }}
          />
        </div>
      </div>

      {/* Reasoning */}
      <div>
        <p className="text-sm font-medium text-gray-300 mb-2">Why This Therapy?</p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-400/80 text-sm leading-relaxed">
            {reasoning}
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
        <p className="text-purple-300 font-medium mb-2 text-sm">Next Steps</p>
        <ul className="text-purple-400/70 text-sm space-y-1 list-disc list-inside">
          <li>Review the therapy details above</li>
          <li>Check your calendar and book an appointment</li>
          <li>Our practitioners may suggest complementary therapies</li>
          <li>Discuss any concerns during your consultation</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-all duration-300 font-medium">
          Ask Again
        </button>
        <button
          onClick={() => {
            // This would navigate to booking in a real app
            alert("Navigate to Book Therapy section to schedule your appointment!");
          }}
          className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-all duration-300 font-bold flex items-center justify-center gap-2">
          <Activity size={18} />
          Book This Therapy
        </button>
      </div>
    </div>
  );
}

/**
 * Therapy Detail Component
 */
function TherapyDetail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-green-400/60 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}
