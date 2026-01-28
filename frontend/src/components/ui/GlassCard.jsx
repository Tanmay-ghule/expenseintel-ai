export default function GlassCard({ children, glow = false, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(148, 163, 184, 0.15)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: glow
          ? "0 0 25px rgba(56,189,248,0.25)"
          : "0 8px 25px rgba(0,0,0,0.4)",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
