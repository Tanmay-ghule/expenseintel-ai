import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../context/AuthContext";
import GlassCard from "./ui/GlassCard";
import { theme } from "../theme";

// -------------------------------------------------------------------
// AI Insight Component
// Displays natural language summary of user's spending
// -------------------------------------------------------------------

export default function AiInsight() {
  const { token } = useAuth();
  const [summary, setSummary] = useState("Analyzing your spending pattern...");

  const loadSummary = async () => {
    try {
      const res = await apiRequest("/expenses/ai-summary", "GET", null, token);
      setSummary(res.summary);
    } catch (error) {
      setSummary("Unable to generate insight right now.");
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <GlassCard glow>
      <h3 style={title}>AI Financial Insight</h3>
      <p style={text}>{summary}</p>
    </GlassCard>
  );
}

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------

const title = {
  marginBottom: "10px",
  fontSize: "15px",
  fontWeight: "500",
  color: theme.primary,
};

const text = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: theme.textMain,
};
