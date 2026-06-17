export default function AnalyzeButton({ onClick, loading, disabled, isUrl }) {
  return (
    <button
      style={{
        ...s.btn,
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <span style={s.inner}>
          <span style={s.spinner} />
          {isUrl ? "Processing URL..." : "Analyzing Text..."}
        </span>
      ) : (
        <span style={s.inner}>
          <span>{isUrl ? "Run Verification" : "Analyze Article"}</span>
        </span>
      )}
    </button>
  );
}

const s = {
  btn: {
    width: "100%", padding: "15px",
    background: "linear-gradient(135deg, #2563eb, #4f8ef7)",
    color: "#fff", border: "none",
    borderRadius: "var(--radius)",
    fontSize: "15px", fontWeight: "700",
    letterSpacing: "0.3px", cursor: "pointer",
    marginTop: "8px", marginBottom: "24px",
    boxShadow: "0 4px 24px rgba(37,99,235,0.35)",
    transition: "opacity 0.2s",
    fontFamily: "var(--font-head)",
  },
  inner: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "8px",
  },
  spinner: {
    width: "16px", height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%", display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
};