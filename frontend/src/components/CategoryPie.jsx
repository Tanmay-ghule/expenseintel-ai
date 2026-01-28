import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { theme } from "../theme";

// -------------------------------------------------------------------
// Category Distribution Pie Chart
// -------------------------------------------------------------------

const COLORS = [
  theme.primary,
  theme.success,
  "#f97316",
  "#e879f9",
  "#f43f5e",
];

export default function CategoryPie() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) loadCategories();
  }, [token]);

  const loadCategories = async () => {
    try {
      const expenses = await apiRequest("/expenses/", "GET", null, token);

      const categoryMap = {};
      expenses.forEach((e) => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
      });

      const result = Object.keys(categoryMap).map((cat) => ({
        name: cat,
        value: categoryMap[cat],
      }));

      setData(result);
    } catch (err) {
      console.error("Category pie error:", err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ color: theme.primary }}>Spending by Category</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
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
