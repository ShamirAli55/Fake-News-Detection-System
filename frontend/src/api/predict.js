const BASE = "http://127.0.0.1:8000";



export async function predictManual(title, text) {
  const res = await fetch(`${BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text }),
  });
  const data = await res.json();
  if (data.error || data.detail) throw new Error(data.error || data.detail);
  return data;
}

export async function predictUrl(url) {
  const res = await fetch(`${BASE}/predict-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const data = await res.json();
  if (data.error || data.detail) throw new Error(data.error || data.detail);
  return data;
}




