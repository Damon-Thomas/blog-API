import React from "react";
import CommentSection from "./commentSection";
import CommentForm from "./commentForm";

export default function CommentContainer({ postInfo }: any) {
  return (
    <div className="commentContainer box-border w-full my-4  md:my-6 flex flex-col bg-white text-darkprimary  rounded-sm ">
      <CommentForm />
      <CommentSection postInfo={postInfo} />
    </div>
  );
}
