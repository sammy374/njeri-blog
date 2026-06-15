"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditPost() {
  const router = useRouter()
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`https://njeri-blog-backend.onrender.com/posts/${id}`)
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
    }
    fetchPost()
  }, [id])

  async function handleUpdate() {
    setLoading(true)
    const token = localStorage.getItem("token")
    await fetch(`https://njeri-blog-backend.onrender.com/posts/${id}`, {
      method: "PUT",
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
      <h1>Edit Post</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 500 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{ padding: 8, fontSize: 16 }}
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          style={{ padding: 10, fontSize: 16, cursor: "pointer" }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </main>
  )
}
