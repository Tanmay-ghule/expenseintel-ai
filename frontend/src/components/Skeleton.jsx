export default function Skeleton({ height = 20, width = "100%" }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: "6px",
        background: "linear-gradient(90deg, #0f172a 25%, #1f2933 37%, #0f172a 63%)",
        backgroundSize: "400% 100%",
        animation: "skeleton 1.4s ease infinite"
      }}
    />
  );
}
