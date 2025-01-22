import { useState, useEffect } from 'react'

function BlogPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_API_URL + 'posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .then(console.log(posts))
      .catch(error => console.error('Error fetching blog posts:', error))
  }, [])

  return (
    <>
      <h1>Blog Posts</h1>
      <div className="card">
        
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogPosts