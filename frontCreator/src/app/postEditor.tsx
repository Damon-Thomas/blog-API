import { useLocation } from "react-router-dom";
import { PostForm } from "./forms/postForm";
import { useEffect, useState } from "react";
import FormWrapper from "./forms/formWrapper";

export default function PostEditor() {
  const postId = useLocation().pathname.split("/posts/").pop();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        import.meta.env.VITE_HOST_URL + "/posts/" + postId,
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
        console.log(data);
        setPostInfo(data);
      } else {
        console.log("Failed to fetch post", response);
      }
    }
    fetchPost();
  }, []);

  console.log("Post Data", postInfo.post);

  return <FormWrapper title="Edit Post" pORc="post" info={postInfo.post} />;
}
