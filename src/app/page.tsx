"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const CATEGORIES = ["ENTRIES", "ROOMS", "STREETS", "OUTFITS", "NOTES"]

export default function Home() {
  const [posts, setPosts] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeCategory, setActiveCategory] = useState("ALL")
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

  useEffect(() => {
    getPosts()
    const token = localStorage.getItem("token")
    if (token) setIsAdmin(true)
  }, [])

  const filtered = activeCategory === "ALL"
    ? posts
    : posts.filter((p: any) => p.category === activeCategory)

  return (
    <main style={{ background: "#fff", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Top Nav */}
      <nav style={{
        background: "#fdf8f4", borderBottom: "1px solid #e8e0d8",
        padding: "0 40px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100
      }}>
        {/* Left — categories */}
        <div style={{ display: "flex", gap: 20 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 10, letterSpacing: 2, fontFamily: "sans-serif",
              color: activeCategory === cat ? "#2c4a3e" : "#9a8f85",
              fontWeight: activeCategory === cat ? "bold" : "normal",
              textTransform: "uppercase", borderBottom: activeCategory === cat ? "2px solid #2c4a3e" : "2px solid transparent",
              paddingBottom: 4
            }}>{cat}</button>
          ))}
        </div>

        {/* Center — blog name */}
        <h1 onClick={() => { setActiveCategory("ALL"); router.push("/") }}
          style={{ fontSize: 26, fontWeight: 400, color: "#2c4a3e", margin: 0, cursor: "pointer", letterSpacing: 3 }}>
          Njeri
        </h1>

        {/* Right — pages + auth */}
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          {["about", "travel-map", "social"].map(page => (
            <button key={page} onClick={() => router.push(`/${page}`)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 10, letterSpacing: 2, color: "#9a8f85",
              fontFamily: "sans-serif", textTransform: "uppercase"
            }}>{page === "travel-map" ? "Travel" : page}</button>
          ))}
          {isAdmin ? (
            <>
              <button onClick={() => router.push("/admin")} style={{
                background: "#2c4a3e", border: "none", cursor: "pointer",
                fontSize: 10, letterSpacing: 2, color: "#fff",
                fontFamily: "sans-serif", textTransform: "uppercase", padding: "6px 14px"
              }}>Dashboard</button>
              <button onClick={() => { localStorage.removeItem("token"); setIsAdmin(false) }} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 10, color: "#9a8f85", fontFamily: "sans-serif"
              }}>Logout</button>
            </>
          ) : (
            <button onClick={() => router.push("/login")} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 10, letterSpacing: 2, color: "#9a8f85",
              fontFamily: "sans-serif", textTransform: "uppercase"
            }}>Login</button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "70px 20px 50px", background: "#fdf8f4", borderBottom: "1px solid #e8e0d8" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 16 }}>
          A travel diary
        </p>
        <h2 style={{ fontSize: 38, fontWeight: 400, color: "#2c4a3e", margin: "0 0 16px", letterSpacing: 1 }}>
          Places, interiors, clothes, food.
        </h2>
        <p style={{ fontSize: 15, color: "#7a6f65", maxWidth: 440, margin: "0 auto", lineHeight: 1.9 }}>
          And quiet personal shifts.
        </p>
      </div>

      {/* Posts Grid */}
      <div style={{ maxWidth: 1100, margin: "50px auto", padding: "0 30px 60px" }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9a8f85", fontStyle: "italic", padding: "60px 0" }}>No posts yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px 30px" }}>
            {filtered.map((post: any) => (
              <div key={post.id}>
                <div style={{ width: "100%", height: 250, overflow: "hidden", marginBottom: 14, background: "#e8e0d8" }}>
                  {post.image_url
                    ? <img src={post.image_url} alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                    : <div style={{ width: "100%", height: "100%", background: "#e8e0d8" }} />
                  }
                </div>
                <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 8 }}>
                  {post.category}
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 400, color: "#2c4a3e", margin: "0 0 10px", lineHeight: 1.5 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: 13, color: "#7a6f65", marginBottom: 12, lineHeight: 1.7 }}>
                  {post.content?.substring(0, 90)}...
                </p>
                <span style={{ fontSize: 12, color: "#2c4a3e", letterSpacing: 1, fontFamily: "sans-serif", cursor: "pointer" }}>
                  Read more →
                </span>
                {isAdmin && (
                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button onClick={() => router.push(`/edit-post/${post.id}`)}
                      style={{ background: "none", border: "none", fontSize: 11, color: "#9a8f85", cursor: "pointer", textDecoration: "underline", fontFamily: "sans-serif" }}>
                      Edit
                    </button>
                    <button onClick={() => deletePost(post.id)}
                      style={{ background: "none", border: "none", fontSize: 11, color: "#c0756a", cursor: "pointer", textDecoration: "underline", fontFamily: "sans-serif" }}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Topics */}
      <div style={{ background: "#fdf8f4", padding: "60px 30px", borderTop: "1px solid #e8e0d8" }}>
        <h2 style={{ textAlign: "center", fontSize: 11, letterSpacing: 4, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 30 }}>
          Explore Topics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 1100, margin: "0 auto" }}>
          {CATEGORIES.map(cat => (
            <div key={cat} onClick={() => { setActiveCategory(cat); window.scrollTo(0, 0) }}
              style={{ height: 180, background: "#ddd5c8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(44,74,62,0.4)" }} />
              <p style={{ position: "relative", color: "#fff", fontSize: 11, letterSpacing: 4, fontFamily: "sans-serif", textTransform: "uppercase" }}>{cat}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "30px 20px", borderTop: "1px solid #e8e0d8" }}>
        <p style={{ fontSize: 11, color: "#9a8f85", fontFamily: "sans-serif", letterSpacing: 2 }}>
          © 2024 NJERI · ALL RIGHTS RESERVED
        </p>
      </footer>
    </main>
  )
}
