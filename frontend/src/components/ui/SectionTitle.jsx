export default function SectionTitle({ children }) {
  return (
    <h2 style={{
      marginTop: "48px",
      marginBottom: "16px",
      fontSize: "20px",
      fontWeight: 600,
      color: "#e5e7eb",
      letterSpacing: "0.3px"
    }}>
      {children}
    </h2>
  );
}
