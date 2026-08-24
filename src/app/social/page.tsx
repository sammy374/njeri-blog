"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Social() {
  const [social, setSocial] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("https://njeri-blog-backend-docker.onrender.com/social")
      .then(r => r.json())
      .then(setSocial)
  }, [])

  const links = [
    { key: "instagram", label: "Instagram", base: "https://instagram.com/" },
    { key: "tiktok", label: "TikTok", base: "https://tiktok.com/@" },
    { key: "twitter", label: "Twitter / X", base: "https://twitter.com/" },
  ]

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Nav */}
      <nav style={{ background: "#fdf8f4", borderBottom: "1px solid #e8e0d8", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase" }}>← Back</button>
        <h1 style={{ fontSize: 24, fontWeight: 400, color: "#2c4a3e", margin: 0, letterSpacing: 3 }}>Njeri</h1>
        <div style={{ width: 60 }} />
      </nav>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "70px 30px" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 16 }}>Social</p>
        <h2 style={{ fontSize: 42, fontWeight: 400, color: "#2c4a3e", margin: "0 0 16px" }}>Follow the journey.</h2>
        <div style={{ width: 40, height: 1, background: "#c9bfb5", marginBottom: 50 }} />

        {links.map(link => (
          <div key={link.key} style={{ borderBottom: "1px solid #e8e0d8", padding: "28px 0" }}>
            <p style={{ fontSize: 10, letterSpacing: 3, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>{link.label}</p>
            {social?.[link.key] ? (
              <a href={`${link.base}${social[link.key].replace("@", "")}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 18, color: "#2c4a3e", textDecoration: "none", fontStyle: "italic" }}>
                {social[link.key]}
              </a>
            ) : (
              <p style={{ fontSize: 14, color: "#c9bfb5", fontStyle: "italic" }}>Coming soon</p>
            )}
          </div>
        ))}
      </div>

      <footer style={{ textAlign: "center", padding: "30px 20px", borderTop: "1px solid #e8e0d8", marginTop: 60 }}>
        <p style={{ fontSize: 11, color: "#9a8f85", fontFamily: "sans-serif", letterSpacing: 2 }}>© 2024 NJERI · ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  )
}
