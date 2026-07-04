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
    setSaving(false); setMsg("About saved! ✓")
    setTimeout(() => setMsg(""), 3000)
  }

  async function saveSocial() {
    setSaving(true)
    await fetch("https://njeri-blog-backend.onrender.com/social", { method: "PUT", headers, body: JSON.stringify(social) })
    setSaving(false); setMsg("Social saved! ✓")
    setTimeout(() => setMsg(""), 3000)
  }

  async function addPin() {
    if (!newPin.city || !newPin.country) return
    await fetch("https://njeri-blog-backend.onrender.com/travel", {
      method: "POST", headers,
      body: JSON.stringify({ ...newPin, latitude: parseFloat(newPin.latitude) || 0, longitude: parseFloat(newPin.longitude) || 0 })
    })
    setNewPin({ city: "", country: "", note: "", latitude: "", longitude: "" })
    fetchAll(); setMsg("Place added! ✓")
    setTimeout(() => setMsg(""), 3000)
  }

  async function deletePin(id: number) {
    await fetch(`https://njeri-blog-backend.onrender.com/travel/${id}`, { method: "DELETE", headers })
    fetchAll()
  }

  async function deletePost(id: number) {
    await fetch(`https://njeri-blog-backend.onrender.com/posts/${id}`, { method: "DELETE", headers })
    fetchAll()
  }

  const inputStyle: any = {
    padding: 12, fontSize: 14, border: "1px solid #e8e0d8",
    fontFamily: "Georgia, serif", width: "100%", background: "#fff",
    boxSizing: "border-box", outline: "none", color: "#3a3530"
  }

  const btnStyle: any = {
    padding: "10px 24px", background: "#2c4a3e", color: "#fff",
    border: "none", cursor: "pointer", fontSize: 10, letterSpacing: 2,
    fontFamily: "sans-serif", textTransform: "uppercase"
  }

  const tabStyle = (active: boolean): any => ({
    padding: "10px 22px",
    background: active ? "#2c4a3e" : "#fff",
    color: active ? "#fff" : "#9a8f85",
    border: "1px solid #e8e0d8",
    cursor: "pointer", fontSize: 10, letterSpacing: 2,
    fontFamily: "sans-serif", textTransform: "uppercase"
  })

  return (
    <main style={{ background: "#fdf8f4", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Header */}
      <nav style={{ background: "#2c4a3e", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 400, color: "#fff", letterSpacing: 3 }}>Njeri</span>
          <span style={{ fontSize: 10, color: "#9ecfc0", fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", marginLeft: 16 }}>Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => router.push("/")} style={{ ...btnStyle, background: "transparent", border: "1px solid #9ecfc0", color: "#9ecfc0" }}>View Blog</button>
          <button onClick={() => { localStorage.removeItem("token"); router.push("/") }} style={{ ...btnStyle, background: "#c0756a" }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 30px" }}>

        {/* Welcome */}
        <div style={{ marginBottom: 35 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, color: "#2c4a3e", margin: "0 0 6px" }}>Welcome back, Njeri</h1>
          <p style={{ fontSize: 13, color: "#9a8f85", fontFamily: "sans-serif" }}>
            {posts.length} posts · {pins.length} places visited
          </p>
        </div>

        {/* Success message */}
        {msg && (
          <div style={{ background: "#2c4a3e", color: "#fff", padding: "12px 20px", marginBottom: 24, fontSize: 13, fontFamily: "sans-serif", letterSpacing: 1 }}>
            {msg}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 30, flexWrap: "wrap" }}>
          {["posts", "about", "social", "travel"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={tabStyle(tab === t)}>{t}</button>
          ))}
        </div>

        {/* POSTS TAB */}
        {tab === "posts" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: 0, letterSpacing: 1 }}>
                All Posts ({posts.length})
              </h2>
              <button onClick={() => router.push("/create-post")} style={btnStyle}>+ New Post</button>
            </div>
            {posts.length === 0 && (
              <p style={{ color: "#9a8f85", fontStyle: "italic", padding: "40px 0" }}>No posts yet. Create your first one!</p>
            )}
            {posts.map(post => (
              <div key={post.id} style={{
                background: "#fff", border: "1px solid #e8e0d8",
                padding: "18px 24px", marginBottom: 8,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title}
                      style={{ width: 56, height: 56, objectFit: "cover", background: "#e8e0d8" }} />
                  )}
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 4 }}>{post.category}</p>
                    <h3 style={{ fontSize: 15, fontWeight: 400, color: "#2c4a3e", margin: 0 }}>{post.title}</h3>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => router.push(`/edit-post/${post.id}`)}
                    style={{ ...btnStyle, background: "none", color: "#2c4a3e", border: "1px solid #2c4a3e" }}>Edit</button>
                  <button onClick={() => deletePost(post.id)}
                    style={{ ...btnStyle, background: "#c0756a" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: "0 0 10px", letterSpacing: 1 }}>About Me</h2>
            <div>
              <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>Profile Photo URL</p>
              <input placeholder="Paste an image URL..." value={about.photo_url || ""}
                onChange={e => setAbout({ ...about, photo_url: e.target.value })} style={inputStyle} />
            </div>
            {about.photo_url && (
              <img src={about.photo_url} alt="Preview" style={{ width: 120, height: 120, objectFit: "cover" }} />
            )}
            <div>
              <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>Bio</p>
              <textarea placeholder="Tell your story..." value={about.bio || ""}
                onChange={e => setAbout({ ...about, bio: e.target.value })}
                rows={6} style={{ ...inputStyle, lineHeight: 1.9 }} />
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>Favorites</p>
              <textarea placeholder="Favorite city, food, book, film..." value={about.favorites || ""}
                onChange={e => setAbout({ ...about, favorites: e.target.value })}
                rows={4} style={{ ...inputStyle, lineHeight: 1.9 }} />
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>Contact Email</p>
              <input placeholder="your@email.com" value={about.email || ""}
                onChange={e => setAbout({ ...about, email: e.target.value })} style={inputStyle} />
            </div>
            <button onClick={saveAbout} disabled={saving} style={{ ...btnStyle, marginTop: 6 }}>
              {saving ? "Saving..." : "Save About"}
            </button>
          </div>
        )}

        {/* SOCIAL TAB */}
        {tab === "social" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: "0 0 10px", letterSpacing: 1 }}>Social Links</h2>
            {[
              { key: "instagram", label: "Instagram Handle" },
              { key: "tiktok", label: "TikTok Handle" },
              { key: "twitter", label: "Twitter / X Handle" },
            ].map(item => (
              <div key={item.key}>
                <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</p>
                <input placeholder="@handle" value={social[item.key] || ""}
                  onChange={e => setSocial({ ...social, [item.key]: e.target.value })} style={inputStyle} />
              </div>
            ))}
            <button onClick={saveSocial} disabled={saving} style={{ ...btnStyle, marginTop: 6 }}>
              {saving ? "Saving..." : "Save Social"}
            </button>
          </div>
        )}

        {/* TRAVEL TAB */}
        {tab === "travel" && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: "0 0 24px", letterSpacing: 1 }}>Travel Map</h2>

            {/* Add new pin */}
            <div style={{ background: "#fff", border: "1px solid #e8e0d8", padding: 28, marginBottom: 28 }}>
              <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 18 }}>Add New Place</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <input placeholder="City" value={newPin.city}
                  onChange={e => setNewPin({ ...newPin, city: e.target.value })} style={inputStyle} />
                <input placeholder="Country" value={newPin.country}
                  onChange={e => setNewPin({ ...newPin, country: e.target.value })} style={inputStyle} />
                <input placeholder="Latitude (e.g. 48.8566 for Paris)" value={newPin.latitude}
                  onChange={e => setNewPin({ ...newPin, latitude: e.target.value })} style={inputStyle} />
                <input placeholder="Longitude (e.g. 2.3522 for Paris)" value={newPin.longitude}
                  onChange={e => setNewPin({ ...newPin, longitude: e.target.value })} style={inputStyle} />
              </div>
              <textarea placeholder="A note about this place — what did it feel like?" value={newPin.note}
                onChange={e => setNewPin({ ...newPin, note: e.target.value })}
                rows={3} style={{ ...inputStyle, marginBottom: 12 }} />
              <button onClick={addPin} style={btnStyle}>Add Place</button>
            </div>

            {/* Existing pins */}
            {pins.length === 0 && (
              <p style={{ color: "#9a8f85", fontStyle: "italic" }}>No places yet. Add your first one above!</p>
            )}
            {pins.map(pin => (
              <div key={pin.id} style={{
                background: "#fff", border: "1px solid #e8e0d8",
                padding: "18px 24px", marginBottom: 8,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: 2, color: "#9a8f85", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 4 }}>{pin.country}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 400, color: "#2c4a3e", margin: "0 0 4px" }}>{pin.city}</h3>
                  {pin.note && <p style={{ fontSize: 13, color: "#7a6f65", margin: 0 }}>{pin.note.substring(0, 80)}...</p>}
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
