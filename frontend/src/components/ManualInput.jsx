export default function ManualInput({ title, text, onTitle, onText }) {
  return (
    <div>
      <Field label="Article Title">
        <input
          style={inp}
          placeholder="e.g. Scientists discover new treatment for..."
          value={title}
          onChange={e => onTitle(e.target.value)}
        />
      </Field>
      <Field label="Article Body">
        <textarea
          style={{ ...inp, resize: "vertical", lineHeight: 1.7 }}
          placeholder="Paste the full article text here..."
          value={text}
          onChange={e => onText(e.target.value)}
          rows={7}
        />
      </Field>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={lbl}>{label}</label>
      {children}
    </div>
  );
}

const inp = {
  width: "100%", padding: "16px 20px",
  borderRadius: "12px",
  border: "1.5px solid var(--border2)",
  background: "rgba(0,0,0,0.2)",
  color: "var(--text)", fontSize: "15px",
  outline: "none", boxSizing: "border-box",
  transition: "all 0.2s",
  fontFamily: "var(--font-body)",
};

const lbl = {
  display: "block", fontSize: "11px",
  fontWeight: "700", letterSpacing: "1px",
  textTransform: "uppercase",
  color: "var(--accent)", marginBottom: "10px",
  opacity: 0.8,
};