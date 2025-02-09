import CommentForm from "./commentForm";
import { PostForm } from "./postForm";
import { PostEditorForm } from "./editPostForm";
export default function FormWrapper({
  title,
  edit,
  pORc,
}: {
  title: string;
  edit: boolean;
  pORc?: "post" | "comment" | null;
}) {
  return (
    <div className="editorWindow flex flex-col items-center justify-center w-full h-full gap-4">
      <h1>{title}</h1>
      <div className="formContainer bg-white p-4 rounded-lg shadow-lg w-full h-full mb-4">
        {pORc === "post" ? (
          edit ? (
            <PostEditorForm />
          ) : (
            <PostForm />
          )
        ) : pORc === "comment" ? (
          edit ? (
            <CommentEditForm />
          ) : (
            <CommentForm />
          )
        ) : (
          <h1 className="text-red">Error Loading Form</h1>
        )}
      </div>
    </div>
  );
}
