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
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="flex w-full h-full flex-col justify-start p-4">
      <h1 className="text-2xl md:text-4xl text-center">Dashboard</h1>
      <p>Welcome {userInfo.user.username}</p>
    </div>
  );
}
