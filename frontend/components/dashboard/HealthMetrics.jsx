import { useState } from "react";
import {
  Heart,
  TrendingUp,
  Droplet,
  Zap,
  Plus,
  Calendar,
  Edit2,
} from "lucide-react";

const HEALTH_METRICS = [
  {
    id: "energy",
    name: "Energy Level",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    unit: "/10",
    current: 6,
  },
  {
    id: "digestion",
    name: "Digestion",
    icon: Droplet,
    color: "from-green-500 to-emerald-500",
    unit: "/10",
    current: 7,
  },
  {
    id: "sleep",
    name: "Sleep Quality",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
    unit: "/10",
    current: 5,
  },
  {
    id: "stress",
    name: "Stress Level",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    unit: "/10",
    current: 7, // Lower is better
  },
];

const THERAPY_PROGRESS = [
  {
    id: 1,
    therapy: "Virechana",
    date: "2025-11-20",
    status: "Completed",
    feedback:
      "Felt much lighter and refreshed after the session. Digestion improved.",
    rating: 4.5,
  },
  {
    id: 2,
    therapy: "Nasya",
    date: "2025-11-15",
    status: "Completed",
    feedback: "Great experience. Sinuses cleared and felt more energetic.",
    rating: 4.8,
  },
];

export default function HealthMetrics() {
  const [metrics, setMetrics] = useState(HEALTH_METRICS);
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);

  const handleUpdateMetric = (metricId, value) => {
    setMetrics((prev) =>
      prev.map((m) => (m.id === metricId ? { ...m, current: value } : m))
    );
  };

  return (
    <div className="space-y-8">
      {/* Current Metrics Overview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-cinzel font-bold text-white">
            Your Health Dashboard
          </h2>
          <button
            onClick={() => setShowAddMetric(!showAddMetric)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg transition-all duration-300">
            <Plus size={18} />
            <span className="text-sm font-medium">Track Custom Metric</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const percentage = (metric.current / 10) * 100;

            return (
              <div
                key={metric.id}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:bg-white/[0.08]">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} bg-opacity-20`}>
                    <Icon size={24} className="text-white/80" />
                  </div>
                  <button
                    onClick={() => setEditingMetric(metric.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    <Edit2 size={16} className="text-gray-400" />
                  </button>
                </div>

                <h3 className="font-medium text-gray-300 mb-3 text-sm">
                  {metric.name}
                </h3>

                <div className="mb-4">
                  {editingMetric === metric.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={metric.current}
                        onChange={(e) =>
                          handleUpdateMetric(metric.id, parseInt(e.target.value))
                        }
                        className="flex-1"
                      />
                      <button
                        onClick={() => setEditingMetric(null)}
                        className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                        ✓
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {metric.current}{" "}
                        <span className="text-sm text-gray-400">
                          {metric.unit}
                        </span>
                      </p>
                    </>
                  )}
                </div>

                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={12} />
                  Updated today
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Metrics Section */}
      {showAddMetric && <CustomMetricForm onClose={() => setShowAddMetric(false)} />}

      {/* Therapy Progress Notes */}
      <div>
        <h2 className="text-xl font-cinzel font-bold text-white mb-6">
          Therapy Progress Notes
        </h2>

        <div className="space-y-4">
          {THERAPY_PROGRESS.map((entry) => (
            <div
              key={entry.id}
              className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:bg-white/[0.08]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-white">
                    {entry.therapy}
                  </h3>
                  <p className="text-green-400/70 text-sm flex items-center gap-2 mt-1">
                    <Calendar size={14} />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(entry.rating)
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{entry.rating}/5</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {entry.feedback}
              </p>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    entry.status === "Completed"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}>
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Tips */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
        <h3 className="font-cinzel font-bold text-white mb-4">💡 Wellness Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              Maintain consistent sleep schedule to improve sleep quality
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>Practice light stretching or yoga after meals for better digestion</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              Stay hydrated and follow a balanced diet as recommended by your
              practitioner
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span>
              Track your metrics weekly to monitor progress and recovery
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Custom Metric Form Component
 */
function CustomMetricForm({ onClose }) {
  const [customMetric, setCustomMetric] = useState({ name: "", value: 5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save custom metric to backend
    alert(`Custom metric "${customMetric.name}" added successfully!`);
    setCustomMetric({ name: "", value: 5 });
    onClose();
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6">
      <h3 className="font-bold text-white mb-4">Add Custom Health Metric</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="E.g., Headache frequency, Appetite, Mood"
          value={customMetric.name}
          onChange={(e) =>
            setCustomMetric({ ...customMetric, name: e.target.value })
          }
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
        />

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="10"
            value={customMetric.value}
            onChange={(e) =>
              setCustomMetric({ ...customMetric, value: parseInt(e.target.value) })
            }
            className="flex-1"
          />
          <span className="text-white font-bold w-8 text-center">
            {customMetric.value}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!customMetric.name}
            className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg font-medium disabled:opacity-50">
            Add Metric
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
