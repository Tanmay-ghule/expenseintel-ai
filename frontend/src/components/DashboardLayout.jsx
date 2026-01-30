import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { theme } from "../theme";
import "../index.css";

import ExpenseSection from "./ExpenseSection";
import KpiSection from "./KpiSection";
import MonthlyChart from "./MonthlyChart";
import CategoryPie from "./CategoryPie";
import DailyBar from "./DailyBar";
import AiInsight from "./AiInsight";
import ReportsSection from "./ReportsSection";

// -------------------------------------------------------------------
// Dashboard Layout - Main authenticated UI
// -------------------------------------------------------------------

function DashboardLayout() {
  const { token, logout } = useAuth();
  const jwtUser = jwtDecode(token);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bgMain,
        color: theme.textMain,
      }}
    >
      {/* ================= NAVBAR ================= */}
      <nav style={navStyle} className={scrolled ? "nav-blur" : ""}>
        <h2 style={{ color: theme.primary }}>ExpenseIntel</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: theme.textMuted, fontSize: "14px" }}>
            {jwtUser.sub}
          </span>
          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <div style={mainWrap} className="fade-slide">
        {/* Welcome Section */}
        <div style={welcomeBox}>
          <h2 style={welcomeText}>Welcome to ExpenseIntel</h2>
          <p style={overviewText}>Your financial overview</p>
        </div>

        {/* KPI Cards */}
        <KpiSection />

        {/* Charts */}
        <h2 style={sectionTitle}>Analytics</h2>
        <div style={grid2Col}>
          <MonthlyChart />
          <CategoryPie />
        </div>

        <DailyBar />

        {/* Insight */}
        <h2 style={sectionTitle}>Insight</h2>
        <AiInsight />

        {/* Reports */}
        <h2 style={sectionTitle}>Reports</h2>
        <ReportsSection />

        {/* Expense Table */}
        <ExpenseSection />
      </div>
    </div>
  );
}

export default DashboardLayout;

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------

const navStyle = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  height: "60px",
  width: "100%",
  background: theme.bgMain,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  borderBottom: `1px solid ${theme.border}`,
  transition: "all 0.3s ease",
};

const logoutBtn = {
  background: "transparent",
  border: `1px solid ${theme.primary}`,
  padding: "6px 12px",
  borderRadius: "6px",
  color: theme.primary,
  cursor: "pointer",
};

const mainWrap = {
  padding: "32px",
  width: "100vw",
};

const welcomeBox = {
  marginBottom: "24px",
};

const welcomeText = {
  fontSize: "24px",
  fontWeight: "600",
  color: theme.textMain,
};

const overviewText = {
  fontSize: "14px",
  color: theme.textMuted,
  marginTop: "4px",
};

const sectionTitle = {
  marginTop: "40px",
  marginBottom: "10px",
  color: theme.textMain,
};

const grid2Col = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "24px",
};
