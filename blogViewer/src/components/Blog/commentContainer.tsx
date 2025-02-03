export default function CommentSection({ postInfo }: any) {
  return (
    <div className="comments box-border w-full mt-4  md:m-12 flex flex-col bg-white text-darkprimary  rounded-sm">
      <div className="commentHead px-2 pt-2 md:px-8 md:pt-8 border-b-2 border-primary">
        <h2 className="text-sm md:text-sm font-bold pb-2">Comments</h2>
      </div>
      <div className="commentContent p-2 mb-4 md:p-8 ">
        {postInfo.comments.map((comment: any) => (
          <div id={comment.id} className="comment flex flex-col gap-2 md:gap-4">
            <p className="commentAuthor font-bold text-primary">
              @{comment.username}
            </p>
            <p className="commentContent text-sm">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
