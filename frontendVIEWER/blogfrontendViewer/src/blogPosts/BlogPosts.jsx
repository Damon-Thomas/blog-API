import { useState, useEffect } from 'react'
import PostPreview from './PostPreview'

function BlogPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_API_URL + '/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error))
  }, [])

  return (
    <>
      <h1>Blog Posts</h1>
      <div className="card">
        
        {posts.map(post => (
          console.log('POST', post),
          console.log('POST CONTENT', post.content),
          <PostPreview key={post.id} title={post.title} author={post.authorId} content={post.content} date={post.updatedAt}/>
        ))}
      </div>
    </>
  )
}

export default BlogPosts