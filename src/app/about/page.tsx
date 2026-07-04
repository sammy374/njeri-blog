"use client"
import { useEffect, useState } from "react"

export default function About() {
  const [about, setAbout] = useState<any>(null)

  useEffect(() => {
    fetch("https://njeri-blog-backend.onrender.com/about")
      .then(r => r.json())
      .then(setAbout)
  }, [])

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "80px 30px" }}>
        <a href="/" style={{ fontSize: 11, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", textDecoration: "none" }}>← Back</a>
        <h1 style={{ fontSize: 48, fontWeight: 400, color: "#2c4a3e", margin: "30px 0 10px" }}>About Me</h1>
        <div style={{ width: 40, height: 1, background: "#c9bfb5", marginBottom: 40 }} />

        {about?.photo_url && (
          <img src={about.photo_url} alt="Njeri"
            style={{ width: "100%", height: 450, objectFit: "cover", marginBottom: 40 }} />
        )}

        <p style={{ fontSize: 16, lineHeight: 2, color: "#5a5048", marginBottom: 40 }}>
          {about?.bio || "Bio coming soon..."}
        </p>

        {about?.favorites && (
          <div style={{ borderTop: "1px solid #e8e0d8", paddingTop: 30, marginBottom: 30 }}>
            <h3 style={{ fontSize: 11, letterSpacing: 3, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 20 }}>
              A Few Favorites
            </h3>
            <p style={{ fontSize: 15, lineHeight: 2, color: "#5a5048" }}>{about.favorites}</p>
          </div>
        )}

        {about?.email && (
          <div style={{ borderTop: "1px solid #e8e0d8", paddingTop: 30 }}>
            <h3 style={{ fontSize: 11, letterSpacing: 3, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>
              Get In Touch
            </h3>
            <a href={`mailto:${about.email}`} style={{ fontSize: 15, color: "#2c4a3e" }}>{about.email}</a>
          </div>
        )}
      </div>
    </main>
  )
}
