import { PostForm } from "./postForm";

export default function PostCreator() {
  return (
    <div className="creatorWindow flex flex-col items-center justify-center w-full h-full gap-4">
      <h1>Post Creator</h1>
      <div className="formContainer bg-white p-4 rounded-lg shadow-lg w-full h-full mb-4">
        <PostForm />
      </div>
    </div>
  );
}
