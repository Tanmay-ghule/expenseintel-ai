import { useState } from "react";
import { theme } from "./theme";
import "./index.css";

// -------------------------------------------------------------------
// Register Component
// -------------------------------------------------------------------

function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Registration failed");
        return;
      }

      localStorage.setItem("user_name", name);
      setSuccess("Account created successfully. Please login.");

      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch {
      setError("Server not reachable");
    }
  };

  return (
    <div style={pageStyle}>
      <form
        onSubmit={handleRegister}
        style={cardStyle}
        className="fade-in glow-hover"
      >
        <h2 style={title}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle} className="btn-glow">
          Register
        </button>

        <p style={switchText}>
          Already have an account?{" "}
          <span style={linkText} onClick={switchToLogin}>
            Login
          </span>
        </p>

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}
      </form>
    </div>
  );
}

export default Register;

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
  width: "380px",
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
  marginBottom: "14px",
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

const successStyle = {
  color: theme.success,
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
