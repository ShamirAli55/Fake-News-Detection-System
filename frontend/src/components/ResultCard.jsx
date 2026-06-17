import { useState } from "react";
import ConfidenceBars from "./ConfidenceBars";

export default function ResultCard({ result }) {
  const [open, setOpen] = useState(false);
  const isFake = result.label === "FAKE";
  const color = isFake ? "var(--fake)" : "var(--real)";
  const bg = isFake ? "var(--fake-bg)" : "var(--real-bg)";
  const border = isFake ? "var(--fake-bdr)" : "var(--real-bdr)";

  return (
    <div className="fade-up" style={{ ...s.card, background: bg, border: `1.5px solid ${border}` }}>

      {/* Extracted title */}
      {result.extracted_title && (
        <div style={s.extracted}>
          <span style={s.extractedIcon}>📰</span>
          <span style={s.extractedText}>{result.extracted_title}</span>
        </div>
      )}

      {/* Verdict */}
      <div className="mobile-stack" style={s.verdictRow}>
        <div style={{ ...s.badge, background: color }}>
          {isFake ? "✕" : "✓"}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ ...s.label, color }}>{isFake ? "FAKE NEWS" : "REAL NEWS"}</p>
          <p style={s.sub}>
            {isFake
              ? "This article shows characteristics of misinformation."
              : "This article appears to be credible and legitimate."}
          </p>
        </div>
        <button
          style={{ ...s.toggleBtn, color, borderColor: border }}
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide ▲" : "Details ▼"}
        </button>
      </div>

      {/* Details */}
      {open && (
        <div style={s.details}>
          <div style={{ ...s.divider, borderColor: border }} />

          {result.extracted_text && (
            <div style={s.preview}>
              <p style={s.previewLabel}>Article Preview</p>
              <p style={s.previewText}>{result.extracted_text}</p>
            </div>
          )}

          <ConfidenceBars
            confidenceReal={result.confidence_real}
            confidenceFake={result.confidence_fake}
          />
        </div>
      )}
    </div>
  );
}

const s = {
  card: { borderRadius: "var(--radius)", padding: "20px", transition: "all 0.3s" },
  extracted: {
    display: "flex", alignItems: "flex-start", gap: "8px",
    background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-sm)",
    padding: "10px 12px", marginBottom: "16px",
  },
  extractedIcon: { fontSize: "14px", flexShrink: 0, marginTop: "1px" },
  extractedText: { fontSize: "13px", color: "var(--text)", lineHeight: 1.5, fontWeight: "500" },
  verdictRow: { display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" },
  badge: {
    width: "48px", height: "48px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: "22px", fontWeight: "800", flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  label: {
    fontFamily: "var(--font-head)",
    fontSize: "26px", fontWeight: "800",
    letterSpacing: "-0.03em", margin: "0 0 2px 0",
    lineHeight: 1,
  },
  sub: { fontSize: "14px", color: "var(--muted)", margin: 0, fontWeight: "450" },
  toggleBtn: {
    marginLeft: "auto", padding: "7px 14px",
    background: "transparent",
    border: "1px solid",
    borderRadius: "999px",
    fontSize: "12px", fontWeight: "700",
    cursor: "pointer", whiteSpace: "nowrap",
    fontFamily: "var(--font-body)",
    transition: "all 0.2s",
  },
  details: { marginTop: "4px" },
  divider: { borderTop: "1px solid", margin: "16px 0" },
  preview: { marginBottom: "20px" },
  previewLabel: {
    fontSize: "11px", fontWeight: "700", letterSpacing: "0.8px",
    textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px",
  },
  previewText: {
    fontSize: "13px", color: "var(--muted)",
    background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-sm)",
    padding: "12px", lineHeight: 1.7, fontStyle: "italic",
  },
};