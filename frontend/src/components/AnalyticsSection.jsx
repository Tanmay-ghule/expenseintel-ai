import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

import MonthlyChart from "./MonthlyChart";
import CategoryPie from "./CategoryPie";
import DailyBar from "./DailyBar";

export default function AnalyticsSection() {
  return (
    <div style={{ marginTop: "48px" }}>
      <SectionTitle>Analytics</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "16px" }}>
        <GlassCard>
          <MonthlyChart />
        </GlassCard>

        <GlassCard>
          <CategoryPie />
        </GlassCard>
      </div>

      <div style={{ marginTop: "24px" }}>
        <GlassCard>
          <DailyBar />
        </GlassCard>
      </div>
    </div>
  );
}
