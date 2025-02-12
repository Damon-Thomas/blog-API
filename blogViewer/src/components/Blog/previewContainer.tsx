import React, { useEffect, useState } from "react";
import BlogPreview from "./blogPreview";

interface Post {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
  author: {
    username: string;
  };
  object: any;
  Comments: any[];
}

export default function BlogPreviewContainer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log("load complete");

          console.log("Data", data);
          setPosts(data);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (error) {
        setError("An error occurred while fetching posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center justify-self-center">
        <svg
          className="animate-spin h-24 w-24 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="blogPreviewContainer flex flex-col ">
      <div className="blogPreviews grid grid-cols-1 sm:grid-cols-2  w-full gap-4 px-2 md:px-6">
        {posts.map((post) => (
          <a href={`/post/${post.id}`} key={post.id}>
            <BlogPreview
              title={post.title}
              content={post.content}
              updated={post.updatedAt}
              author={post.author.username}
              comments={post.comments.length}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
