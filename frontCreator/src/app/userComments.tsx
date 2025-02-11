import { useEffect, useState } from "react";

export default function UserComments() {
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    async function fetchUserComments() {
      console.log(
        "....fetching user comments",
        `${import.meta.env.VITE_HOST_URL}/comments/user`,
        `${localStorage.getItem("token")}`
      );
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
        console.log("Data", data);
        setUserComments(data);
      } else {
        console.log("Failed to fetch comments", response);
      }
    }
    fetchUserComments();
  }, []);
  console.log("User Comments", userComments);

  return (
    <div className="postPageWindow w-full h-full flex flex-col gap-4 pt-4">
      <div className="headWrapper">
        <h1 className="text-center">Your Comments</h1>
        <p className="text-center text-lg ">Click a comment to edit it!</p>
      </div>
      <div className="flex flex-col w-full">
        {userComments.length === 0 ? (
          <h2 className="text-2xl text-center text-secondary">
            No comments found
          </h2>
        ) : (
          <div className="postContainer flex flex-col gap-4 md:gap-8">
            <div className="postSectionWrapper">
              <div className="postSectionWrapper">
                {userComments.map((comment) => (
                  <div
                    className="flex flex-col p-2 w-full bg-lightprimary hover:bg-secondary border-2 border-darkprimary rounded-md cursor-pointer"
                    key={comment.id}
                    onClick={() => {
                      window.location.href = `/comments/${comment.id}`;
                    }}
                  >
                    <div className="postMetaData flex justify-between flex-wrap align-middle">
                      <p className="commentPreview text-darkprimary w-[calc(100vw/2)] overflow-hidden text-ellipsis text-nowrap">
                        {comment.content}
                      </p>
                      <p className="text-darkprimary w-60 ">
                        Last Update:{" "}
                        {new Date(comment.updatedAt).toDateString()}
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
