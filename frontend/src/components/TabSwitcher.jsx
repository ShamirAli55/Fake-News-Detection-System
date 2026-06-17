const TABS = [
  { label: "Manual Analysis" },
  { label: "URL Analysis" },
];

export default function TabSwitcher({ active, onChange }) {
  return (
    <div style={s.row}>
      {TABS.map((t, i) => (
        <button
          key={i}
          style={{
            ...s.tab,
            ...(active === i ? s.tabActive : s.tabInactive),
          }}
          onClick={() => onChange(i)}
        >
          <span>{t.icon}</span> <span className="mobile-hide-text">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

const s = {
  row: {
    display: "flex", gap: "6px",
    background: "rgba(0,0,0,0.2)",
    borderRadius: "14px",
    padding: "6px",
    marginBottom: "32px",
    border: "1px solid var(--border)",
  },
  tab: {
    flex: 1, padding: "12px 18px",
    borderRadius: "10px",
    fontSize: "14px", fontWeight: "600",
    border: "none", cursor: "pointer",
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "10px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "var(--font-body)",
  },
  tabActive: {
    background: "var(--accent)",
    color: "#fff",
    boxShadow: "0 8px 16px rgba(79,142,247,0.25)",
  },
  tabInactive: {
    background: "transparent",
    color: "var(--muted)",
  },
};