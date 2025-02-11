import BlogPost from "./blogPost";
import CommentSection from "./commentSection";
import CommentForm from "./commentForm";
import CommentContainer from "./commentContainer";

export default function PostContainer({ postInfo, setPostInfo }: any) {
  return (
    <div className="postypost flex flex-col w-full items-center overflow-y-auto min-h-0">
      <BlogPost postInfo={postInfo} />
      <CommentContainer postInfo={postInfo} setPostInfo={setPostInfo} />
    </div>
  );
}
