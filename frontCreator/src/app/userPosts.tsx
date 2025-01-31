import { useEffect, useState } from "react";

export default function UserPosts() {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      console.log(
        "....fetching user posts",
        `${import.meta.env.VITE_HOST_URL}/posts/user`,
        `${localStorage.getItem("token")}`
      );
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
        console.log("Data", data);
        setUserPosts(data);
      } else {
        console.log("Failed to fetch posts", response);
      }
    }
    fetchUserPosts();
  }, []);

  return (
    <div>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

//Working on fetching post data from the server
