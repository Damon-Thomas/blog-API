import { useLocation } from "react-router-dom";

export default function PostEditor() {
  const postId = useLocation().pathname.split("/posts/").pop();
  return (
    <div className="editorWindow">
      <h1>Post Editor</h1>
      <p>{postId}</p>
    </div>
  );
}
