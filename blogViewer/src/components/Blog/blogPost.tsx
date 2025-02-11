import CommentSection from "./commentSection";

export default function BlogPost({ postInfo }: any) {
  return (
    <div className="blogPost w-full flex flex-col bg-white text-darkprimary rounded-sm">
      <div className="postHead px-2 pt-2 md:px-8 md:pt-8 border-b-2 border-secondary">
        <h1 className="text-xl md:text-4xl font-bold pb-2 break-words">
          {postInfo.post.title}
        </h1>
      </div>
      <div className="postContent p-2 mb-4 md:p-8 break-words">
        <p className="whitespace-pre-wrap">{postInfo.post.content}</p>
      </div>
      <div className="postFoot p-2 md:p-4 flex justify-between items-center flex-wrap">
        <p className="postauthor text-sm font-bold text-primary">
          {postInfo.author.username}
        </p>
        <p className="lastUpdate text-sm text-darkprimary">
          Last Updated:{" "}
          <span className="text-darkprimary">
            {new Date(postInfo.post.updatedAt).toDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}
