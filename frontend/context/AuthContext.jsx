import { createContext, useContext, useState } from "react";

/**
 * Auth Context - manages patient session state
 * TODO: Integrate with actual authentication backend
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Mock login - replace with actual auth API call
   * @param {string} email - Patient email
   * @param {string} password - Patient password
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/login`, { ... });
      // const data = response.json();

      // Mock response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPatient = {
        id: `patient-${Date.now()}`,
        email,
        name: email.split("@")[0],
        createdAt: new Date().toISOString(),
      };

      setPatient(mockPatient);
      localStorage.setItem("patient", JSON.stringify(mockPatient));
      return { success: true, patient: mockPatient };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mock signup
   */
  const signup = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPatient = {
        id: `patient-${Date.now()}`,
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      setPatient(mockPatient);
      localStorage.setItem("patient", JSON.stringify(mockPatient));
      return { success: true, patient: mockPatient };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setPatient(null);
    localStorage.removeItem("patient");
  };

  /**
   * Restore patient session from localStorage on app load
   */
  const restoreSession = () => {
    const stored = localStorage.getItem("patient");
    if (stored) {
      try {
        setPatient(JSON.parse(stored));
      } catch (err) {
        console.error("Error restoring session:", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        patient,
        loading,
        error,
        login,
        signup,
        logout,
        restoreSession,
        isAuthenticated: !!patient,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
