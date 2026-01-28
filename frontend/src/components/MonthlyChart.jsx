import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";
import { theme } from "../theme";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// -------------------------------------------------------------------
// Monthly Spending Line Chart
// -------------------------------------------------------------------

export default function MonthlyChart() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) loadMonthly();
  }, [token]);

  const loadMonthly = async () => {
    try {
      const res = await apiRequest("/expenses/monthly-trend", "GET", null, token);

      const monthMap = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const formatted = res.map((item) => ({
        month: monthMap[item.month - 1],
        total: item.total,
      }));

      setData(formatted);
    } catch (err) {
      console.error("Monthly chart error:", err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ color: theme.primary }}>Monthly Spending Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke={theme.border} />
          <XAxis dataKey="month" stroke={theme.textMuted} />
          <YAxis stroke={theme.textMuted} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke={theme.primary}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
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
