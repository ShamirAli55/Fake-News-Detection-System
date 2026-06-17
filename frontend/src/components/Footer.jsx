export default function Footer() {
  return (
    <footer style={s.footer}>
      <p style={s.copy}>SE3812 AI Project · Hussain Asif & Shamir Ali</p>
    </footer>
  );
}

const s = {
  footer: { textAlign: "center", marginTop: "32px" },
  copy: { fontSize: "11px", color: "var(--muted)", opacity: 0.5 },
};