import CommentForm from "./commentForm";
import { PostForm } from "./postForm";

export default function FormWrapper({
  title,
  pORc,
  info = null,
}: {
  title: string;
  pORc?: "post" | "comment" | null;
  info?: any;
}) {
  return (
    <div className="editorWindow flex flex-col items-center justify-center w-full h-full gap-4">
      <h1>{title}</h1>
      <div className="formContainer bg-white p-4 rounded-lg shadow-lg w-full h-full mb-4">
        {pORc === "post" ? (
          <PostForm post={info} />
        ) : pORc === "comment" ? (
          <CommentForm comment={info} />
        ) : (
          <h1 className="text-red">Error Loading Form</h1>
        )}
      </div>
    </div>
  );
}
