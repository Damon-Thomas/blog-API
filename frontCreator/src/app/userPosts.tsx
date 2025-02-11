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
  console.log("User Posts", userPosts);
  const publishedPosts = userPosts.filter((post) => post.published);
  const unpublishedPosts = userPosts.filter((post) => !post.published);

  return (
    <div className="postPageWindow w-full h-full flex flex-col gap-4 pt-4">
      <div className="headWrapper">
        <h1 className="text-center">Your Posts</h1>
        <p className="text-center text-lg ">Click a post to edit it!</p>
      </div>
      <div className="flex flex-col w-full">
        {userPosts.length === 0 ? (
          <h2 className="text-2xl text-center text-secondary">
            No posts found
          </h2>
        ) : (
          <div className="postContainer flex flex-col gap-4 md:gap-8">
            <div className="postSectionWrapper">
              <h2 className=" py-2 text-2xl font-bold">Published Posts</h2>
              <div className="postSectionWrapper">
                {publishedPosts.map((post) => (
                  <div
                    className="flex flex-col p-2 w-full bg-lightprimary hover:bg-secondary border-2 border-darkprimary rounded-md cursor-pointer"
                    key={post.id}
                    onClick={() => {
                      window.location.href = `/posts/${post.id}`;
                    }}
                  >
                    <h2 className="font-bold text-darkprimary w-[calc(100vw*.5)] overflow-hidden text-ellipsis text-nowrap">
                      {post.title}
                    </h2>
                    <div className="postMeatData flex justify-between flex-wrap align-middle">
                      <p className="text-darkprimary">
                        Comments: {post.Comments.length}
                      </p>
                      <p className="text-darkprimary w-60">
                        Last Update: {new Date(post.updatedAt).toDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="postSectionWrapper">
              <h2 className=" py-2 text-2xl font-bold">Unpublished Posts</h2>
              <div className="postSectionWrapper">
                {unpublishedPosts.map((post) => (
                  <div
                    className="flex flex-col p-2 w-full bg-lightprimary hover:bg-secondary border-2 border-darkprimary rounded-md cursor-pointer"
                    key={post.id}
                    onClick={() => {
                      window.location.href = `/posts/${post.id}`;
                    }}
                  >
                    <h2 className="font-bold text-darkprimary w-[calc(100vw*.5)] overflow-hidden text-ellipsis text-nowrap">
                      {post.title}
                    </h2>
                    <div className="postMeatData flex justify-between flex-wrap align-middle ">
                      <p className="text-darkprimary ">
                        Comments: {post.Comments.length}
                      </p>
                      <p className="text-darkprimary w-60">
                        Last Update: {new Date(post.updatedAt).toDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//Working on fetching post data from the server
