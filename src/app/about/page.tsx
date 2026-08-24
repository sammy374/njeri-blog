"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function About() {
  const [about, setAbout] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("https://njeri-blog-backend-docker.onrender.com/about")
      .then(r => r.json())
      .then(setAbout)
  }, [])

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Nav */}
      <nav style={{ background: "#fdf8f4", borderBottom: "1px solid #e8e0d8", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase" }}>← Back</button>
        <h1 style={{ fontSize: 24, fontWeight: 400, color: "#2c4a3e", margin: 0, letterSpacing: 3 }}>Njeri</h1>
        <div style={{ width: 60 }} />
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "70px 30px" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 16 }}>About</p>
        <h2 style={{ fontSize: 42, fontWeight: 400, color: "#2c4a3e", margin: "0 0 30px" }}>The person behind the diary.</h2>
        <div style={{ width: 40, height: 1, background: "#c9bfb5", marginBottom: 40 }} />

        {about?.photo_url && (
          <img src={about.photo_url} alt="Njeri"
            style={{ width: "100%", height: 500, objectFit: "cover", marginBottom: 40 }} />
        )}

        {!about?.photo_url && (
          <div style={{ width: "100%", height: 400, background: "#e8e0d8", marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#9a8f85", fontFamily: "sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>Photo coming soon</p>
          </div>
        )}

        <p style={{ fontSize: 16, lineHeight: 2, color: "#5a5048", marginBottom: 40 }}>
          {about?.bio || "Bio coming soon..."}
        </p>

        {about?.favorites && (
          <div style={{ borderTop: "1px solid #e8e0d8", paddingTop: 35, marginBottom: 35 }}>
            <p style={{ fontSize: 11, letterSpacing: 3, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 20 }}>A Few Favorites</p>
            <p style={{ fontSize: 15, lineHeight: 2, color: "#5a5048" }}>{about.favorites}</p>
          </div>
        )}

        {about?.email && (
          <div style={{ borderTop: "1px solid #e8e0d8", paddingTop: 35 }}>
            <p style={{ fontSize: 11, letterSpacing: 3, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
            <a href={`mailto:${about.email}`} style={{ fontSize: 16, color: "#2c4a3e" }}>{about.email}</a>
          </div>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: "30px 20px", borderTop: "1px solid #e8e0d8" }}>
        <p style={{ fontSize: 11, color: "#9a8f85", fontFamily: "sans-serif", letterSpacing: 2 }}>© 2024 NJERI · ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  )
}
