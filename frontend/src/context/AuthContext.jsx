import { createContext, useContext, useState } from "react";

// -------------------------------------------------------------------
// Authentication Context
// -------------------------------------------------------------------

const AuthContext = createContext(null);

// Provider to wrap the app and manage auth state
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Save JWT token after login
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Clear token on logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
