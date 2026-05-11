export default function PostsPage() {
  const posts = [
    { id: 1, title: "First Post", content: "Hello world" },
    { id: 2, title: "Learning Next.js", content: "This is my blog" }
  ]

  return (
    <main style={{ padding: 20 }}>
      <h1>Posts</h1>

      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  )
}