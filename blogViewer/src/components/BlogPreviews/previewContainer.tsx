import React, { useEffect, useState } from 'react';
import BlogPreview from './blogPreview';

export default function BlogPreviewContainer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Data', data);
          setPosts(data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred while fetching posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="blogPreviewContainer flex flex-col ">
      
      <div className="blogPreviews grid grid-cols-1 sm:grid-cols-2  w-full gap-4 py-4 px-2 md:px-6">
        {posts.map((post) => (
          <BlogPreview key={post.id} title={post.title} content={post.content} updated={post.updatedAt} author={post.author.username} comments={post.Comments.length} />
        ))}
      </div>
    </div>
  );
}