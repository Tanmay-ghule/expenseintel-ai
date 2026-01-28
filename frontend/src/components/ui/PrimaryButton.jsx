export default function PrimaryButton({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        color: "#020617",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 0 15px rgba(56,189,248,0.3)",
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
