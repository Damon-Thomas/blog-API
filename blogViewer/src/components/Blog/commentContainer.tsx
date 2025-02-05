import React from "react";
import CommentSection from "./commentSection";
import CommentForm from "./commentForm";

export default function CommentContainer({ postInfo, setPostInfo }: any) {
  return (
    <div className="commentContainer box-border w-full mt-4  md:m-6 flex flex-col bg-white text-darkprimary  rounded-sm">
      <CommentForm postInfo={postInfo} setPostInfo={setPostInfo} />
      <CommentSection postInfo={postInfo} />
    </div>
  );
}
