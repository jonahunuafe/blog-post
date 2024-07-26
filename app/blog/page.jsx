import React from 'react'

async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store"
  });

  if(!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const blogs = await fetchBlogs();
  console.log(blogs);
  return (
    <div>Blog</div>
  )
}

export default Blog