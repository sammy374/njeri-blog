"use client"
import { useEffect, useState } from "react"

export default function TravelMap() {
  const [pins, setPins] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch("https://njeri-blog-backend.onrender.com/travel")
      .then(r => r.json())
      .then(setPins)
  }, [])

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 30px" }}>
        <a href="/" style={{ fontSize: 11, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", textDecoration: "none" }}>← Back</a>
        <h1 style={{ fontSize: 48, fontWeight: 400, color: "#2c4a3e", margin: "30px 0 10px" }}>Travel Map</h1>
        <div style={{ width: 40, height: 1, background: "#c9bfb5", marginBottom: 40 }} />
        <p style={{ fontSize: 15, color: "#7a6f65", marginBottom: 40 }}>Places I have been.</p>

        {pins.length === 0 ? (
          <p style={{ color: "#9a8f85", fontStyle: "italic" }}>No places added yet — check back soon.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {pins.map(pin => (
              <div key={pin.id} onClick={() => setSelected(selected?.id === pin.id ? null : pin)}
                style={{ background: "#fff", padding: 25, border: "1px solid #e8e0d8", cursor: "pointer",
                  borderLeft: selected?.id === pin.id ? "3px solid #2c4a3e" : "3px solid transparent" }}>
                <p style={{ fontSize: 11, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 8 }}>{pin.country}</p>
                <h3 style={{ fontSize: 20, fontWeight: 400, color: "#2c4a3e", marginBottom: 10 }}>{pin.city}</h3>
                {selected?.id === pin.id && pin.note && (
                  <p style={{ fontSize: 14, color: "#7a6f65", lineHeight: 1.8, marginTop: 10, borderTop: "1px solid #e8e0d8", paddingTop: 10 }}>{pin.note}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
