"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  async function getPosts() {
    const res = await fetch("https://njeri-blog-backend.onrender.com/posts", { cache: "no-store" })
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

  return (
    <main style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Njeri's Blog</h1>
        <div style={{ display: "flex", gap: 10 }}>
          {isAdmin ? (
            <>
              <a href="/create-post">+ Create Post</a>
              <button onClick={logout} style={{ cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </div>

      {posts.map((post: any) => (
        <div key={post.id} style={{ marginTop: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {isAdmin && (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => router.push(`/edit-post/${post.id}`)}
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                style={{ padding: "5px 10px", cursor: "pointer", color: "red" }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  )
}
