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
          console.log("loading complete", postInfo);
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
    <div className="postypost flex flex-col w-[100%-80px] items-center h-full">
      <div className="blogPost box-border w-full mt-4  md:m-12 flex flex-col bg-white text-darkprimary  rounded-sm ">
        <div className="postHead px-2 pt-2 md:px-8 md:pt-8 border-b-2 border-secondary">
          <h1 className="text-xl md:text-4xl font-bold pb-2">
            {postInfo.post.title}
          </h1>
        </div>
        <div className="postContent p-2 mb-4 md:p-8 ">
          <p>{postInfo.post.content}</p>
        </div>
        <div className="postFoot p-2 md:p-4 flex justify-between items-center flex-wrap ">
          <p className="postauthor text-sm font-bold text-primary">
            {postInfo.author.username}
          </p>
          <p className="lastUpdate text-sm text-darkprimary">
            Last Updated:{" "}
            <span className="text-darkprimary">
              {new Date(postInfo.post.updatedAt).toDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="comments box-border w-full mt-4  md:m-12 flex flex-col bg-white text-darkprimary  rounded-sm">
        <div className="commentHead px-2 pt-2 md:px-8 md:pt-8 border-b-2 border-primary">
          <h2 className="text-sm md:text-sm font-bold pb-2">Comments</h2>
        </div>
        <div className="commentContent p-2 mb-4 md:p-8 ">
          {postInfo.comments.map((comment) => (
            <div className="comment flex flex-col gap-2 md:gap-4">
              <p className="commentAuthor font-bold text-primary">
                @{comment.username}
              </p>
              <p className="commentContent text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
