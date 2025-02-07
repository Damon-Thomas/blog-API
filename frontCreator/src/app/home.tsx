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
    console.log("Post", posts[i].Comments.length);
    userPostComments += posts[i].Comments.length;
  }

  return (
    <div className="flex w-full h-full flex-col justify-start p-4">
      <div className="head">
        <h1 className="text-2xl md:text-4xl text-center">Dashboard</h1>
        <p>Welcome {userInfo.user.username}</p>
      </div>
      <div className="statSection">
        <h2 className="text-2xl md:text-3xl py-2">Stats</h2>
        <div className="stats grid gap-4 grid-cols-2 md:grid-cols-3">
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
        </div>
      </div>
    </div>
  );
}
