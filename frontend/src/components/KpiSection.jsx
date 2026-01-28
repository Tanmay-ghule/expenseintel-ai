import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";
import { theme } from "../theme";
import "../index.css";

// -------------------------------------------------------------------
// KPI Section - Displays key financial metrics with animations
// -------------------------------------------------------------------

export default function KpiSection() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const data = await apiRequest("/expenses/analytics/", "GET", null, token);
      setStats(data);
    } catch (err) {
      console.error("KPI load error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Skeleton loading state
  if (loading || !stats) {
    return (
      <div style={containerStyle}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={cardStyle} className="skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <KpiCard title="Total Spent" value={stats.total_spent} prefix="₹" />
      <KpiCard title="Top Category" value={stats.top_category} />
      <KpiCard title="Monthly Average" value={stats.monthly_average} prefix="₹" />
    </div>
  );
}

// -------------------------------------------------------------------
// Single KPI Card with Count-Up Animation
// -------------------------------------------------------------------

function KpiCard({ title, value, prefix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (typeof value === "number") {
      let start = 0;
      const end = value;
      const step = Math.max(end / 40, 1);

      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setDisplay(Math.floor(start));
      }, 20);

      return () => clearInterval(interval);
    }
  }, [value]);

  return (
    <div style={cardStyle} className="card-hover fade-slide">
      <p style={titleStyle}>{title}</p>
      <h2 style={valueStyle}>
        {typeof value === "number" ? `${prefix}${display}` : value}
      </h2>
    </div>
  );
}

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "24px",
};

const cardStyle = {
  background: `linear-gradient(135deg, ${theme.bgMain}, ${theme.bgCard})`,
  border: `1px solid ${theme.border}`,
  borderRadius: "14px",
  padding: "22px",
  boxShadow: theme.glow,
  minHeight: "110px",
};

const titleStyle = {
  color: theme.textMuted,
  fontSize: "13px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  marginBottom: "6px",
};

const valueStyle = {
  color: theme.primary,
  fontSize: "26px",
  fontWeight: "600",
};
