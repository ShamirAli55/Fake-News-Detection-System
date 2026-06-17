export default function ConfidenceBars({ confidenceReal, confidenceFake }) {
  return (
    <div style={s.wrap}>
      <p style={s.title}>Model Confidence</p>
      <Bar label="Real" pct={confidenceReal} color="#22c97a" track="rgba(34,201,122,0.15)" />
      <Bar label="Fake" pct={confidenceFake} color="#f04f4f" track="rgba(240,79,79,0.15)" />
    </div>
  );
}

function Bar({ label, pct, color, track }) {
  return (
    <div style={s.row}>
      <span style={{ ...s.label, color }}>{label}</span>
      <div style={{ ...s.track, background: track }}>
        <div style={{ ...s.fill, width: `${pct}%`, background: color }} />
      </div>
      <span style={{ ...s.pct, color }}>{pct}%</span>
    </div>
  );
}

const s = {
  wrap: { marginBottom: "24px" },
  title: {
    fontSize: "11px", fontWeight: "700",
    letterSpacing: "0.8px", textTransform: "uppercase",
    color: "var(--muted)", marginBottom: "14px",
  },
  row: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" },
  label: { fontSize: "13px", fontWeight: "700", width: "36px", flexShrink: 0 },
  track: {
    flex: 1, height: "8px",
    borderRadius: "999px", overflow: "hidden",
  },
  fill: {
    height: "100%", borderRadius: "999px",
    transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
  },
  pct: { fontSize: "13px", fontWeight: "800", width: "38px", textAlign: "right" },
};