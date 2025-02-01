import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const id = useParams();

  useEffect(() => {
    async function fetchPost() {
      console.log("fetching post", id.id);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_URL}/posts/${id.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          console.log("load complete");

          console.log("Data", data);
          setPostInfo(data);
        } else {
          setError("Failed to fetch posts");
        }
      } catch (error) {
        setError("An error occurred while fetching posts");
      } finally {
        setTimeout(() => {
          // Simulate a delay
          setLoading(false);
        }, 1000);
      }
    }
    fetchPost();
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
    <div className="blogPost">
      <h1>{postInfo.post.title}</h1>
      <p className="author">{postInfo.author.username}</p>
      <p>{postInfo.post.content}</p>
    </div>
  );
}
