"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreatePost() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const token = localStorage.getItem("token")
    await fetch("https://njeri-blog-backend.onrender.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
    setLoading(false)
    router.push("/")
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Create New Post</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 500 }}>
        <input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <textarea
          placeholder="Write your post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{ padding: 8, fontSize: 16 }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ padding: 10, fontSize: 16, cursor: "pointer" }}
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </main>
  )
}
