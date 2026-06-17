import { useState } from "react";
import Header from "./components/Header";
import TabSwitcher from "./components/TabSwitcher";
import ManualInput from "./components/ManualInput";
import UrlInput from "./components/UrlInput";
import AnalyzeButton from "./components/AnalyzeButton";
import ResultCard from "./components/ResultCard";
import Footer from "./components/Footer";
import { predictManual, predictUrl } from "./api/predict";

export default function App() {
  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canAnalyze = tab === 0
    ? title.trim() && text.trim()
    : url.trim() && url.startsWith("http");

  const handleAnalyze = async () => {
    setLoading(true); setResult(null); setError(null);
    try {
      const data = tab === 0
        ? await predictManual(title, text)
        : await predictUrl(url);
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-padding" style={s.page}>
      <div style={s.mesh} />
      <div style={s.glow1} />
      <div style={s.glow2} />

      <div style={s.wrap}>
        <Header />

        <div style={s.card}>
          <TabSwitcher
            active={tab}
            onChange={(i) => { setTab(i); setResult(null); setError(null); }}
          />

          {tab === 0
            ? <ManualInput title={title} text={text} onTitle={setTitle} onText={setText} />
            : <UrlInput url={url} onUrl={setUrl} />}

          <AnalyzeButton
            onClick={handleAnalyze}
            loading={loading}
            disabled={loading || !canAnalyze}
            isUrl={tab === 1}
          />

          {error && <div style={s.error}>⚠️ {error}</div>}
          {result && <ResultCard result={result} />}
        </div>

        <Footer />
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    padding: "24px 16px", position: "relative", overflow: "hidden",
  },
  mesh: {
    position: "fixed", inset: 0, zIndex: 0,
    backgroundImage: `
      radial-gradient(ellipse 80% 50% at 20% 20%, rgba(37,99,235,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(34,201,122,0.05) 0%, transparent 60%)
    `,
  },
  glow1: {
    position: "fixed", top: "-200px", left: "-200px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)",
    pointerEvents: "none",
  },
  glow2: {
    position: "fixed", bottom: "-200px", right: "-200px",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(34,201,122,0.06), transparent 70%)",
    pointerEvents: "none",
  },
  wrap: { width: "100%", maxWidth: "600px", position: "relative", zIndex: 1 },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  error: {
    background: "var(--fake-bg)",
    border: "1px solid var(--fake-bdr)",
    borderRadius: "var(--radius-sm)",
    padding: "12px 16px",
    color: "var(--fake)",
    fontSize: "13px", marginBottom: "16px",
  },
};