async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  })

  return res.json()
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main style={{ padding: "20px" }}>
      <h1>My Blog</h1>

      {posts.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
    </main>
  )
}
