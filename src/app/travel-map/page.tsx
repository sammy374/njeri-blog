"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function TravelMap() {
  const [pins, setPins] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("https://njeri-blog-backend.onrender.com/travel")
      .then(r => r.json())
      .then(setPins)
  }, [])

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Nav */}
      <nav style={{ background: "#fdf8f4", borderBottom: "1px solid #e8e0d8", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase" }}>← Back</button>
        <h1 style={{ fontSize: 24, fontWeight: 400, color: "#2c4a3e", margin: 0, letterSpacing: 3 }}>Njeri</h1>
        <div style={{ width: 60 }} />
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "70px 30px" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 16 }}>Travel</p>
        <h2 style={{ fontSize: 42, fontWeight: 400, color: "#2c4a3e", margin: "0 0 16px" }}>Places I have been.</h2>
        <div style={{ width: 40, height: 1, background: "#c9bfb5", marginBottom: 50 }} />

        {pins.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "#9a8f85", fontStyle: "italic", fontSize: 16 }}>No places added yet — check back soon.</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: "flex", gap: 40, marginBottom: 50, borderBottom: "1px solid #e8e0d8", paddingBottom: 30 }}>
              <div>
                <p style={{ fontSize: 36, fontWeight: 400, color: "#2c4a3e", margin: 0 }}>{pins.length}</p>
                <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginTop: 4 }}>Places</p>
              </div>
              <div>
                <p style={{ fontSize: 36, fontWeight: 400, color: "#2c4a3e", margin: 0 }}>
                  {[...new Set(pins.map((p: any) => p.country))].length}
                </p>
                <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginTop: 4 }}>Countries</p>
              </div>
            </div>

            {/* Places grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 15 }}>
              {pins.map(pin => (
                <div key={pin.id}
                  onClick={() => setSelected(selected?.id === pin.id ? null : pin)}
                  style={{
                    background: "#fff", padding: 28,
                    border: "1px solid #e8e0d8", cursor: "pointer",
                    borderLeft: selected?.id === pin.id ? "3px solid #2c4a3e" : "3px solid transparent",
                    transition: "border 0.2s"
                  }}>
                  <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 8 }}>{pin.country}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 400, color: "#2c4a3e", margin: "0 0 6px" }}>{pin.city}</h3>
                  {selected?.id === pin.id && pin.note && (
                    <p style={{ fontSize: 14, color: "#7a6f65", lineHeight: 1.9, marginTop: 14, borderTop: "1px solid #e8e0d8", paddingTop: 14 }}>
                      {pin.note}
                    </p>
                  )}
                  {selected?.id !== pin.id && (
                    <p style={{ fontSize: 11, color: "#c9bfb5", fontFamily: "sans-serif", marginTop: 8 }}>Click to read note →</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: "30px 20px", borderTop: "1px solid #e8e0d8", marginTop: 60 }}>
        <p style={{ fontSize: 11, color: "#9a8f85", fontFamily: "sans-serif", letterSpacing: 2 }}>© 2024 NJERI · ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  )
}
