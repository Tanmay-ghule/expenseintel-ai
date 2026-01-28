import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { theme } from "../theme";

// -------------------------------------------------------------------
// Daily Spending Bar Chart
// -------------------------------------------------------------------

export default function DailyBar() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) loadDaily();
  }, [token]);

  const loadDaily = async () => {
    try {
      const expenses = await apiRequest("/expenses/", "GET", null, token);

      const dayMap = {};
      expenses.forEach((e) => {
        const day = e.date;
        dayMap[day] = (dayMap[day] || 0) + e.amount;
      });

      const result = Object.keys(dayMap).map((d) => ({
        date: d,
        total: dayMap[d],
      }));

      setData(result);
    } catch (err) {
      console.error("Daily bar chart error:", err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ color: theme.primary }}>Daily Spending</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke={theme.border} />
          <XAxis dataKey="date" stroke={theme.textMuted} />
          <YAxis stroke={theme.textMuted} />
          <Tooltip />
          <Bar dataKey="total" fill={theme.success} />
        </BarChart>
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
