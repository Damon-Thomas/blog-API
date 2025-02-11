import CommentForm from "./commentForm";
import { PostForm } from "./postForm";
import { PostEditorForm } from "./editPostForm";
import { EditCommentForm } from "./editCommentForm";
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
    <div className="editorWindow flex flex-col items-center justify-center box-border w-full h-full gap-4 pt-4">
      <h1 className="text-4xl font-bold text-center">{title}</h1>
      <div className="formContainer bg-white p-4 md:p-6 lg:p-8 xl:p-10 rounded-lg shadow-lg mb-4 w-full max-w-2xl">
        {pORc === "post" ? (
          edit ? (
            <PostEditorForm />
          ) : (
            <PostForm />
          )
        ) : pORc === "comment" ? (
          edit ? (
            <EditCommentForm />
          ) : (
            <h1>
              {" "}
              There's been an error, you cannot make new comments in the creator
              app!
            </h1>
          )
        ) : (
          <h1 className="text-red">Error Loading Form</h1>
        )}
      </div>
    </div>
  );
}
