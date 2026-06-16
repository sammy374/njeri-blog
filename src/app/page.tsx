"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const CATEGORIES = ["ENTRIES", "ROOMS", "STREETS", "OUTFITS", "NOTES"]

export default function Home() {
  const [posts, setPosts] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  async function getPosts() {
    const res = await fetch("https://njeri-blog-backend.onrender.com/posts")
    const data = await res.json()
    setPosts(data)
  }

  async function deletePost(id: number) {
    const token = localStorage.getItem("token")
    await fetch(`https://njeri-blog-backend.onrender.com/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    getPosts()
  }

  function logout() {
    localStorage.removeItem("token")
    setIsAdmin(false)
  }

  useEffect(() => {
    getPosts()
    const token = localStorage.getItem("token")
    if (token) setIsAdmin(true)
  }, [])

  const filtered = activeCategory === "ALL"
    ? posts
    : posts.filter((p: any) => p.category === activeCategory)

  return (
    <main style={{ background: "#f5f0eb", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "50px 20px 10px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 30px" }}>
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#3a3530" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Hamburger Menu */}
        {menuOpen && (
          <div style={{
            position: "absolute", right: 20, top: 60, background: "#fff",
            padding: "30px 50px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
            textAlign: "left", zIndex: 100
          }}>
            {["About Me", "Travel Map", "Social"].map(item => (
              <p key={item} style={{ fontSize: 18, margin: "12px 0", color: "#3a3530", cursor: "pointer" }}>{item}</p>
            ))}
            <hr style={{ margin: "15px 0", borderColor: "#ddd" }} />
            {CATEGORIES.map(cat => (
              <p key={cat} onClick={() => { setActiveCategory(cat); setMenuOpen(false) }}
                style={{ fontSize: 16, margin: "10px 0", color: "#3a3530", cursor: "pointer" }}>{cat}</p>
            ))}
          </div>
        )}

        <h1 style={{ fontSize: 64, fontWeight: 400, letterSpacing: 2, color: "#3a3530", margin: "10px 0 5px" }}>
          Njeri
        </h1>
        <p style={{ fontSize: 15, color: "#7a6f65", letterSpacing: 1, marginBottom: 30 }}>
          A travel diary of places, interiors, clothes, food—and quiet personal shifts.
        </p>

        <div style={{ maxWidth: 500, margin: "0 auto 30px", color: "#5a5048" }}>
          <h2 style={{ fontWeight: 400, fontSize: 22 }}>A private record</h2>
          <p style={{ lineHeight: 1.8, fontSize: 15 }}>
            I started writing while moving through places quietly.<br />
            <em>Not to remember where I went,<br />
            but to notice who I was while I was there.</em>
          </p>
          <p style={{ fontSize: 16 }}>This is a record.</p>
        </div>

        {/* Admin bar */}
        <div style={{ marginBottom: 15 }}>
          {isAdmin ? (
            <span style={{ display: "flex", justifyContent: "center", gap: 15 }}>
              <a href="/create-post" style={{ color: "#7a6f65", fontSize: 13, textDecoration: "underline" }}>+ New Post</a>
              <button onClick={logout} style={{ background: "none", border: "none", color: "#7a6f65", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>Logout</button>
            </span>
          ) : (
            <a href="/login" style={{ color: "#7a6f65", fontSize: 13 }}>Login</a>
          )}
        </div>

        {/* Category Nav */}
        <div style={{ borderTop: "1px solid #c9bfb5", borderBottom: "1px solid #c9bfb5", padding: "12px 0", marginBottom: 40 }}>
          <span style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {["ALL", ...CATEGORIES].map((cat, i, arr) => (
              <span key={cat} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <button onClick={() => setActiveCategory(cat)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 12, letterSpacing: 2,
                  color: activeCategory === cat ? "#3a3530" : "#9a8f85",
                  fontWeight: activeCategory === cat ? "bold" : "normal",
                  textTransform: "uppercase"
                }}>{cat}</button>
                {i < arr.length - 1 && <span style={{ color: "#c9bfb5" }}>·</span>}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Posts Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 30, maxWidth: 900, margin: "0 auto", padding: "0 20px 60px"
      }}>
        {filtered.map((post: any) => (
          <div key={post.id} style={{ cursor: "pointer" }}>
            {/* Image */}
            <div style={{
              width: "100%", height: 260, background: "#ddd5c8", overflow: "hidden", marginBottom: 12
            }}>
              {post.image_url ? (
                <img src={post.image_url} alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#ddd5c8" }} />
              )}
            </div>
            <p style={{ textAlign: "center", fontSize: 15, color: "#3a3530", margin: "0 0 8px" }}>{post.title}</p>
            {isAdmin && (
              <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                <button onClick={() => router.push(`/edit-post/${post.id}`)}
                  style={{ background: "none", border: "none", fontSize: 12, color: "#9a8f85", cursor: "pointer", textDecoration: "underline" }}>
                  Edit
                </button>
                <button onClick={() => deletePost(post.id)}
                  style={{ background: "none", border: "none", fontSize: 12, color: "#c0756a", cursor: "pointer", textDecoration: "underline" }}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
