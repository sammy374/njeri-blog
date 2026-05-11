export async function GET() {
  const posts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" }
  ]

  return Response.json(posts)
}