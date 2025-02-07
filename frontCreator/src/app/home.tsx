import { useEffect, useState } from "react";

export default function Home() {
  const [userInfo, setUserInfo] = useState({
    user: {
      createdAt: "",
      id: "",
      password: "",
      username: "Error Fetching User Info",
    },
  });
  interface Post {
    Comments: any[];
  }
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_URL}/users/protected`,
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
          setUserInfo(data);
        }
      } catch (error) {
        console.error("An error occurred while fetching user info");
      }
    }
    async function fetchUserPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_URL}/posts/user`,
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
          setPosts(data);
        }
      } catch (error) {
        console.error("An error occurred while fetching user posts");
      }
    }
    async function fetchUserComments() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_URL}/comments/user`,
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
          setComments(data);
        }
      } catch (error) {
        console.error("An error occurred while fetching user comments");
      }
    }
    fetchUserInfo();
    fetchUserPosts();
    fetchUserComments();
  }, []);

  console.log("User Info", userInfo.user, "Posts", posts, "Comments", comments);
  let userPostComments = 0;
  for (let i = 0; i < posts.length; i++) {
    userPostComments += posts[i].Comments.length;
  }

  let lastPostDate = null;
  let lastPost = null;
  for (let i = 0; i < posts.length; i++) {
    if (lastPostDate === null) {
      lastPostDate = posts[i].createdAt;
      lastPost = posts[i];
    } else {
      if (posts[i].createdAt > lastPostDate) {
        lastPostDate = posts[i].createdAt;
        lastPost = posts[i];
      }
    }
  }

  let mostCommentedPost = null;
  for (let i = 0; i < posts.length; i++) {
    if (mostCommentedPost === null) {
      mostCommentedPost = posts[i];
    } else {
      if (posts[i].Comments.length > mostCommentedPost.Comments.length) {
        mostCommentedPost = posts[i];
      }
    }
  }

  let lastCommentDate = null;
  let lastComment = null;
  for (let i = 0; i < comments.length; i++) {
    if (lastCommentDate === null) {
      lastCommentDate = comments[i].createdAt;
      lastComment = comments[i];
    } else {
      if (comments[i].createdAt > lastCommentDate) {
        lastCommentDate = comments[i].createdAt;
        lastComment = comments[i];
      }
    }
  }

  console.log("LatPost", lastPost);

  return (
    <div className="flex w-full h-full flex-col justify-start p-4 gap-6 md:gap-12  ">
      <div className="head">
        <h1 className="text-2xl md:text-4xl text-center">Dashboard</h1>
        <p>Welcome {userInfo.user.username}</p>
      </div>
      <div className="statSection">
        <h2 className="statHeading">Stats</h2>
        <div className="stats grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="stat">
            <h3>Your Posts</h3>
            <p>{posts.length}</p>
          </div>
          <div className="stat">
            <h3>Your Comments</h3>
            <p>{comments.length}</p>
          </div>
          <div className="stat">
            <h3>Reader Comments</h3>
            <p>{userPostComments}</p>
          </div>
          <div className="stat">
            <h3>Last Post</h3>
            {lastPost ? (
              <p>{new Date(lastPostDate).toDateString()}</p>
            ) : (
              <p>No Posts Yet</p>
            )}
          </div>
          <div className="stat">
            <h3>Last Comment</h3>
            {lastComment ? (
              <p>{new Date(lastCommentDate).toDateString()}</p>
            ) : (
              <p>No Comments Yet</p>
            )}
          </div>
        </div>
      </div>
      <div className="highlightSections">
        <h2 className="statHeading">Highlights</h2>
        <div className="highlights grid gap-4 lg:gap-x-10 xl:gap-x-14 grid-cols-1 lg:grid-cols-2">
          <div className="highlight">
            <h3 className="font-bold pb-2">Last Post</h3>
            {lastPost ? (
              <div className="postHighlightCard">
                <h6 className="highlightTitle font-bold text-lg">
                  {lastPost.title}
                </h6>
                <p className="">{lastPost.content.substring(0, 100)}...</p>
              </div>
            ) : (
              <div className="postHighlightCard">
                <h6 className="highlightTitle font-bold text-lg">
                  No Posts Yet
                </h6>
              </div>
            )}
          </div>
          <div className="highlight">
            <h3 className="font-bold pb-2">Last Comment</h3>
            {lastComment ? (
              <div className="postHighlightCard">
                <h6 className="highlightTitle font-bold text-lg">
                  {lastComment.content.substring(0, 150)}...
                </h6>
                <p className="">{new Date(lastCommentDate).toDateString()}</p>
              </div>
            ) : (
              <div className="postHighlightCard">
                <h6 className="highlightTitle font-bold text-lg">
                  No Comments Yet
                </h6>
              </div>
            )}
          </div>
          <div className="highlight lg:col-span-2">
            <h3 className="font-bold pb-2">Most Commented Post</h3>
            {mostCommentedPost ? (
              <div className="popularPostHighlightCard flex flex-col gap-2 justify-between">
                <div className="blogContent">
                  <h6 className="highlightTitle font-bold text-lg">
                    {mostCommentedPost.title}
                  </h6>
                  <p>{mostCommentedPost.content.substring(0, 200)}...</p>
                </div>
                <p>Comments: {mostCommentedPost?.Comments.length}</p>
              </div>
            ) : (
              <div className="postHighlightCard">
                <h6 className="highlightTitle font-bold text-lg">
                  No Posts Yet
                </h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
