import { useLocation } from "react-router-dom";

export default function CommentEditor() {
  const commentId = useLocation().pathname.split("/comments/").pop();
  return (
    <div className="editorWindow">
      <h1>Comment Editor</h1>
      <p>{commentId}</p>
    </div>
  );
}
