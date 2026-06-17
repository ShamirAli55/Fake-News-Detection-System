export default function Header() {
  return (
    <header className="fade-up" style={s.header}>
      <h1 style={s.title}>Fake News Detector</h1>
    </header>
  );
}

const s = {
  header: { textAlign: "center", marginBottom: "24px" },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "clamp(32px, 6vw, 48px)",
    fontWeight: "800",
    color: "#fff",
    lineHeight: 1,
    letterSpacing: "-0.02em",
    marginBottom: "0",
    background: "linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.7))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sub: {
    fontSize: "clamp(15px, 2vw, 17px)",
    color: "var(--muted)",
    maxWidth: "480px",
    margin: "0 auto",
    lineHeight: 1.6,
    fontWeight: "400",
  },
};