"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const CATEGORIES = ["ENTRIES", "ROOMS", "STREETS", "OUTFITS", "NOTES"]

export default function Admin() {
  const router = useRouter()
  const [tab, setTab] = useState("posts")
  const [posts, setPosts] = useState<any[]>([])
  const [about, setAbout] = useState<any>({})
  const [social, setSocial] = useState<any>({})
  const [pins, setPins] = useState<any[]>([])
  const [newPin, setNewPin] = useState({ city: "", country: "", note: "", latitude: "", longitude: "" })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { router.push("/login"); return }
    fetchAll()
  }, [])

  async function fetchAll() {
    const [p, a, s, t] = await Promise.all([
      fetch("https://njeri-blog-backend.onrender.com/posts").then(r => r.json()),
      fetch("https://njeri-blog-backend.onrender.com/about").then(r => r.json()),
      fetch("https://njeri-blog-backend.onrender.com/social").then(r => r.json()),
      fetch("https://njeri-blog-backend.onrender.com/travel").then(r => r.json()),
    ])
    setPosts(p); setAbout(a); setSocial(s); setPins(t)
  }

  async function saveAbout() {
    setSaving(true)
    await fetch("https://njeri-blog-backend.onrender.com/about", { method: "PUT", headers, body: JSON.stringify(about) })
    setSaving(false); setMsg("About saved!")
    setTimeout(() => setMsg(""), 3000)
  }

  async function saveSocial() {
    setSaving(true)
    await fetch("https://njeri-blog-backend.onrender.com/social", { method: "PUT", headers, body: JSON.stringify(social) })
    setSaving(false); setMsg("Social saved!")
    setTimeout(() => setMsg(""), 3000)
  }

  async function addPin() {
    if (!newPin.city || !newPin.country) return
    await fetch("https://njeri-blog-backend.onrender.com/travel", {
      method: "POST", headers,
      body: JSON.stringify({ ...newPin, latitude: parseFloat(newPin.latitude) || 0, longitude: parseFloat(newPin.longitude) || 0 })
    })
    setNewPin({ city: "", country: "", note: "", latitude: "", longitude: "" })
    fetchAll()
  }

  async function deletePin(id: number) {
    await fetch(`https://njeri-blog-backend.onrender.com/travel/${id}`, { method: "DELETE", headers })
    fetchAll()
  }

  async function deletePost(id: number) {
    await fetch(`https://njeri-blog-backend.onrender.com/posts/${id}`, { method: "DELETE", headers })
    fetchAll()
  }

  const inputStyle = { padding: 10, fontSize: 14, border: "1px solid #e8e0d8", fontFamily: "Georgia, serif", width: "100%", background: "#fff", boxSizing: "border-box" as const }
  const btnStyle = { padding: "10px 24px", background: "#2c4a3e", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, letterSpacing: 2, fontFamily: "sans-serif", textTransform: "uppercase" as const }
  const tabStyle = (active: boolean) => ({ padding: "10px 20px", background: active ? "#2c4a3e" : "none", color: active ? "#fff" : "#9a8f85", border: "1px solid #e8e0d8", cursor: "pointer", fontSize: 11, letterSpacing: 2, fontFamily: "sans-serif", textTransform: "uppercase" as const })

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 30px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 400, color: "#2c4a3e", margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: 12, color: "#9a8f85", fontFamily: "sans-serif", marginTop: 5 }}>Welcome back, Njeri</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => router.push("/")} style={{ ...btnStyle, background: "none", color: "#2c4a3e", border: "1px solid #2c4a3e" }}>View Blog</button>
            <button onClick={() => { localStorage.removeItem("token"); router.push("/") }} style={{ ...btnStyle, background: "#c0756a" }}>Logout</button>
          </div>
        </div>

        {msg && <div style={{ background: "#2c4a3e", color: "#fff", padding: "10px 20px", marginBottom: 20, fontSize: 13, fontFamily: "sans-serif" }}>{msg}</div>}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 5, marginBottom: 30, flexWrap: "wrap" }}>
          {["posts", "about", "social", "travel"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={tabStyle(tab === t)}>{t}</button>
          ))}
        </div>

        {/* POSTS TAB */}
        {tab === "posts" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 400, color: "#2c4a3e" }}>All Posts ({posts.length})</h2>
              <button onClick={() => router.push("/create-post")} style={btnStyle}>+ New Post</button>
            </div>
            {posts.map(post => (
              <div key={post.id} style={{ background: "#fff", border: "1px solid #e8e0d8", padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 5 }}>{post.category}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: 0 }}>{post.title}</h3>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => router.push(`/edit-post/${post.id}`)} style={{ ...btnStyle, background: "none", color: "#2c4a3e", border: "1px solid #2c4a3e" }}>Edit</button>
                  <button onClick={() => deletePost(post.id)} style={{ ...btnStyle, background: "#c0756a" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, color: "#2c4a3e" }}>About Me</h2>
            <input placeholder="Photo URL" value={about.photo_url || ""} onChange={e => setAbout({ ...about, photo_url: e.target.value })} style={inputStyle} />
            <textarea placeholder="Bio — tell your story..." value={about.bio || ""} onChange={e => setAbout({ ...about, bio: e.target.value })} rows={5} style={{ ...inputStyle, lineHeight: 1.8 }} />
            <textarea placeholder="Favorites — favorite city, food, book, film..." value={about.favorites || ""} onChange={e => setAbout({ ...about, favorites: e.target.value })} rows={3} style={{ ...inputStyle, lineHeight: 1.8 }} />
            <input placeholder="Contact email" value={about.email || ""} onChange={e => setAbout({ ...about, email: e.target.value })} style={inputStyle} />
            <button onClick={saveAbout} disabled={saving} style={btnStyle}>{saving ? "Saving..." : "Save About"}</button>
          </div>
        )}

        {/* SOCIAL TAB */}
        {tab === "social" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, color: "#2c4a3e" }}>Social Links</h2>
            <input placeholder="Instagram handle e.g. @njeri" value={social.instagram || ""} onChange={e => setSocial({ ...social, instagram: e.target.value })} style={inputStyle} />
            <input placeholder="TikTok handle e.g. @njeri" value={social.tiktok || ""} onChange={e => setSocial({ ...social, tiktok: e.target.value })} style={inputStyle} />
            <input placeholder="Twitter/X handle e.g. @njeri" value={social.twitter || ""} onChange={e => setSocial({ ...social, twitter: e.target.value })} style={inputStyle} />
            <button onClick={saveSocial} disabled={saving} style={btnStyle}>{saving ? "Saving..." : "Save Social"}</button>
          </div>
        )}

        {/* TRAVEL TAB */}
        {tab === "travel" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 400, color: "#2c4a3e", marginBottom: 20 }}>Travel Map</h2>

            {/* Add new pin */}
            <div style={{ background: "#fff", border: "1px solid #e8e0d8", padding: 25, marginBottom: 25 }}>
              <h3 style={{ fontSize: 13, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 15 }}>Add New Place</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <input placeholder="City" value={newPin.city} onChange={e => setNewPin({ ...newPin, city: e.target.value })} style={inputStyle} />
                <input placeholder="Country" value={newPin.country} onChange={e => setNewPin({ ...newPin, country: e.target.value })} style={inputStyle} />
                <input placeholder="Latitude (e.g. 48.8566)" value={newPin.latitude} onChange={e => setNewPin({ ...newPin, latitude: e.target.value })} style={inputStyle} />
                <input placeholder="Longitude (e.g. 2.3522)" value={newPin.longitude} onChange={e => setNewPin({ ...newPin, longitude: e.target.value })} style={inputStyle} />
              </div>
              <textarea placeholder="A note about this place..." value={newPin.note} onChange={e => setNewPin({ ...newPin, note: e.target.value })} rows={3} style={{ ...inputStyle, marginBottom: 10 }} />
              <button onClick={addPin} style={btnStyle}>Add Place</button>
            </div>

            {/* Existing pins */}
            {pins.map(pin => (
              <div key={pin.id} style={{ background: "#fff", border: "1px solid #e8e0d8", padding: 20, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 4 }}>{pin.country}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: 0 }}>{pin.city}</h3>
                  {pin.note && <p style={{ fontSize: 13, color: "#7a6f65", marginTop: 5 }}>{pin.note}</p>}
                </div>
                <button onClick={() => deletePin(pin.id)} style={{ ...btnStyle, background: "#c0756a" }}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
