import React from 'react'
import FirstBlog from '@/components/FirstBlog';
import OtherBlogs from '@/components/OtherBlogs';

async function fetchBlogs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${apiUrl}/api/blog`, {
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
  const otherBlogs = blogs?.length > 0 && blogs.slice(1);

  return (
    <>
      {
        blogs?.length > 0 ? (
          <>
            <div className="container py-24 h-[100vh]">
              <h2 className="text-center">
                <span className="text-primaryColor">Trending{" "}</span>
                Blog
              </h2>
              <FirstBlog firstBlog={firstBlog} />
              <OtherBlogs otherBlogs={otherBlogs} />
            </div>
          </>
        ): (
          <h3 className="text-center py-24">No Blogs.</h3>
        )
      }
    </>
  )
}

export default Blog