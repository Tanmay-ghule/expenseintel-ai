import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { theme } from "./theme";
import "./index.css";

// -------------------------------------------------------------------
// Login Component
// -------------------------------------------------------------------

function Login({ switchToRegister }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password");
        return;
      }

      login(data.access_token);
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleLogin} style={cardStyle} className="fade-in glow-hover">
        <h2 style={title}>ExpenseIntel AI</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle} className="btn-glow">
          Login
        </button>

        <p style={switchText}>
          Don’t have an account?{" "}
          <span style={linkText} onClick={switchToRegister}>
            Register
          </span>
        </p>

        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------

const pageStyle = {
  minHeight: "100vh",
  width: "100vw",
  background: `linear-gradient(135deg, ${theme.bgMain}, ${theme.bgCard})`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  background: `linear-gradient(135deg, ${theme.bgMain}, ${theme.bgCard})`,
  padding: "40px",
  borderRadius: "14px",
  width: "360px",
  border: `1px solid ${theme.border}`,
  boxShadow: theme.glow,
};

const title = {
  color: theme.primary,
  textAlign: "center",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: `1px solid ${theme.border}`,
  background: theme.bgMain,
  color: theme.textMain,
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: theme.primary,
  color: theme.bgMain,
  fontWeight: "600",
  cursor: "pointer",
};

const errorStyle = {
  color: theme.danger,
  textAlign: "center",
  marginTop: "10px",
};

const switchText = {
  textAlign: "center",
  marginTop: "12px",
  color: theme.textMuted,
  fontSize: "14px",
};

const linkText = {
  color: theme.primary,
  cursor: "pointer",
};
