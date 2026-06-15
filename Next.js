async function getPosts() {
  const res = await fetch("http://127.0.0.1:8000/posts", {
    cache: "no-store",
  });

  return res.json();
}
