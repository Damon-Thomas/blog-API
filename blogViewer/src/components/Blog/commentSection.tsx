export default function CommentSection({ postInfo }: any) {
  return (
    <div className="comments">
      <div className="commentHead px-2 pt-2 md:px-8 md:pt-8 border-b-2 border-primary">
        <h2 className="text-sm md:text-sm font-bold pb-2">Comments</h2>
      </div>
      <div className="commentContent p-2 mb-4 md:p-8 flex flex-col gap-3 md:gap-4">
        {postInfo.comments.map((comment: any) => (
          <div
            key={comment.id}
            className="comment flex flex-col p-2 bg-lightsecondary rounded-md"
          >
            <div className="flex justify-between flex-wrap commentMetaData font-bold text-primary">
              <p className="flex">@{comment.username}</p>
              <p>{new Date(comment.updatedAt).toDateString()}</p>
            </div>
            <p className="commentContent text-sm break-words w-full">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
