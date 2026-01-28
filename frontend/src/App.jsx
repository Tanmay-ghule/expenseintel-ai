import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./Login";
import Register from "./Register";
import DashboardLayout from "./components/DashboardLayout";

// -------------------------------------------------------------------
// Root Application Component
// Handles authentication flow & screen switching
// -------------------------------------------------------------------

function App() {
  const { token } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  // If user is authenticated, show dashboard
  if (token) {
    return <DashboardLayout />;
  }

  // Otherwise toggle between Login and Register screens
  return showRegister ? (
    <Register switchToLogin={() => setShowRegister(false)} />
  ) : (
    <Login switchToRegister={() => setShowRegister(true)} />
  );
}

export default App;
