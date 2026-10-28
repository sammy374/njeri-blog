"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const CATEGORIES = ["ENTRIES", "ROOMS", "STREETS", "OUTFITS", "NOTES"]

export default function CreatePost() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("ENTRIES")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const token = localStorage.getItem("token")
    await fetch("https://njeri-blog-backend.onrender.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content, category, image_url: imageUrl }),
    })
    setLoading(false)
    router.push("/")
  }

  return (
    <main style={{ background: "#f5f0eb", minHeight: "100vh", fontFamily: "Georgia, serif", padding: 40 }}>
      <h1 style={{ textAlign: "center", fontWeight: 400, fontSize: 36, color: "#3a3530" }}>New Entry</h1>
      <div style={{ maxWidth: 600, margin: "30px auto", display: "flex", flexDirection: "column", gap: 15 }}>
        <input placeholder="Title (e.g. Paris — October 2023)" value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 12, fontSize: 16, background: "#fff", border: "1px solid #c9bfb5", fontFamily: "Georgia, serif" }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 12, fontSize: 14, background: "#fff", border: "1px solid #c9bfb5" }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input placeholder="Image URL (paste a link to an image)" value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ padding: 12, fontSize: 14, background: "#fff", border: "1px solid #c9bfb5" }} />
        <textarea placeholder="Write your entry..." value={content}
          onChange={(e) => setContent(e.target.value)} rows={10}
          style={{ padding: 12, fontSize: 15, background: "#fff", border: "1px solid #c9bfb5", fontFamily: "Georgia, serif", lineHeight: 1.8 }} />
        <button onClick={handleSubmit} disabled={loading}
          style={{ padding: 14, fontSize: 14, letterSpacing: 2, background: "#3a3530", color: "#f5f0eb", border: "none", cursor: "pointer", textTransform: "uppercase" }}>
          {loading ? "Publishing..." : "Publish Entry"}
        </button>
        <a href="/" style={{ textAlign: "center", color: "#9a8f85", fontSize: 13 }}>← Back</a>
      </div>
    </main>
  )
}
