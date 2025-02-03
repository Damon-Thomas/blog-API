import BlogPost from "./blogPost";
import CommentSection from "./commentContainer";
import CommentForm from "./commentForm";

export default function PostContainer({ postInfo }: any) {
  return (
    <div className="postypost flex flex-col w-[100%-80px] items-center h-full">
      <BlogPost postInfo={postInfo} />
      <CommentForm />
      <CommentSection postInfo={postInfo} />
    </div>
  );
}
