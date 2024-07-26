import React from 'react'
import FirstBlog from '@/components/FirstBlog';

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

  const firstBlog = blogs && blogs[0];

  return (
    <div>
      {
        blogs?.length > 0 ? (
          <>
            <FirstBlog firstBlog={firstBlog} />
          </>
        ): (
          <h3>No Blogs.</h3>
        )
      }
    </div>
  )
}

export default Blog