export default function UrlInput({ url, onUrl }) {
  return (
    <div>
      <div style={{ marginBottom: "18px" }}>
        <label style={lbl}>Article URL</label>
        <div style={s.inputWrap}>
          <span style={s.icon}>🔗</span>
          <input
            style={s.input}
            placeholder="https://edition.cnn.com/..."
            value={url}
            onChange={e => onUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

const lbl = {
  display: "block", fontSize: "12px",
  fontWeight: "600", letterSpacing: "0.6px",
  textTransform: "uppercase",
  color: "var(--muted)", marginBottom: "8px",
};

const s = {
  inputWrap: {
    display: "flex", alignItems: "center",
    background: "var(--bg)",
    border: "1.5px solid var(--border2)",
    borderRadius: "var(--radius-sm)",
    padding: "0 16px", gap: "10px",
  },
  icon: { fontSize: "16px", flexShrink: 0 },
  input: {
    flex: 1, padding: "13px 0",
    background: "transparent",
    border: "none", outline: "none",
    color: "var(--text)", fontSize: "14px",
    fontFamily: "var(--font-body)",
  },
  hint: {
    display: "flex", alignItems: "flex-start", gap: "10px",
    background: "rgba(79,142,247,0.06)",
    border: "1px solid rgba(79,142,247,0.15)",
    borderRadius: "var(--radius-sm)",
    padding: "12px 14px",
    fontSize: "13px", color: "#7eb3fa", lineHeight: 1.6,
  },
  hintIcon: { fontSize: "15px", flexShrink: 0, marginTop: "1px" },
};