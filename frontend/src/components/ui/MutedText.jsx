export default function MutedText({ children }) {
  return (
    <p style={{
      color: "#94a3b8",
      fontSize: "13px",
      lineHeight: "1.6"
    }}>
      {children}
    </p>
  );
}
