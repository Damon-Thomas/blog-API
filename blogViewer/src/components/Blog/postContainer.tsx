import BlogPost from "./blogPost";
import CommentSection from "./commentSection";
import CommentForm from "./commentForm";
import CommentContainer from "./commentContainer";

export default function PostContainer({ postInfo, setPostInfo }: any) {
  return (
    <div className="postypost flex flex-col w-[100%-80px] items-center h-full">
      <BlogPost postInfo={postInfo} />
      <CommentContainer postInfo={postInfo} setPostInfo={setPostInfo} />
    </div>
  );
}
