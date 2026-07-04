"use client"
import { useEffect, useState } from "react"

export default function Social() {
  const [social, setSocial] = useState<any>(null)

  useEffect(() => {
    fetch("https://njeri-blog-backend.onrender.com/social")
      .then(r => r.json())
      .then(setSocial)
  }, [])

  const links = [
    { key: "instagram", label: "Instagram", url: social?.instagram ? `https://instagram.com/${social.instagram.replace("@", "")}` : null },
    { key: "tiktok", label: "TikTok", url: social?.tiktok ? `https://tiktok.com/@${social.tiktok.replace("@", "")}` : null },
    { key: "twitter", label: "Twitter / X", url: social?.twitter ? `https://twitter.com/${social.twitter.replace("@", "")}` : null },
  ]

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "80px 30px" }}>
        <a href="/" style={{ fontSize: 11, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", textDecoration: "none" }}>← Back</a>
        <h1 style={{ fontSize: 48, fontWeight: 400, color: "#2c4a3e", margin: "30px 0 10px" }}>Social</h1>
        <div style={{ width: 40, height: 1, background: "#c9bfb5", marginBottom: 40 }} />
        <p style={{ fontSize: 15, color: "#7a6f65", marginBottom: 40, lineHeight: 1.8 }}>
          Follow along on the journey.
        </p>
        {links.map(link => (
          <div key={link.key} style={{ borderBottom: "1px solid #e8e0d8", padding: "20px 0" }}>
            <p style={{ fontSize: 11, letterSpacing: 3, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 8 }}>{link.label}</p>
            {link.url
              ? <a href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 16, color: "#2c4a3e", textDecoration: "none" }}>
                  {social?.[link.key]}
                </a>
              : <p style={{ fontSize: 14, color: "#c9bfb5" }}>Coming soon</p>
            }
          </div>
        ))}
      </div>
    </main>
  )
}
