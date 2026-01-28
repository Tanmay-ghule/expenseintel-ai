import { useAuth } from "../context/AuthContext";
import { theme } from "../theme";

// -------------------------------------------------------------------
// Reports Section
// Allows users to export their expenses as CSV or PDF
// -------------------------------------------------------------------

export default function ReportsSection() {
  const { token } = useAuth();
  const API_BASE = "http://127.0.0.1:8000";

  const downloadFile = async (type) => {
    const response = await fetch(`${API_BASE}/expenses/export/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `expenses.${type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={cardStyle}>
      <h3 style={title}>Export Reports</h3>

      <div style={buttonRow}>
        <button style={btnStyle} onClick={() => downloadFile("csv")}>
          Download CSV
        </button>

        <button style={btnStyle} onClick={() => downloadFile("pdf")}>
          Download PDF
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------

const cardStyle = {
  background: `linear-gradient(135deg, ${theme.bgMain}, ${theme.bgCard})`,
  border: `1px solid ${theme.border}`,
  borderRadius: "12px",
  padding: "20px",
  marginTop: "30px",
  boxShadow: theme.glow,
};

const title = {
  color: theme.primary,
  marginBottom: "12px",
};

const buttonRow = {
  display: "flex",
  gap: "16px",
};

const btnStyle = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: theme.primary,
  color: theme.bgMain,
  fontWeight: "600",
  cursor: "pointer",
};
