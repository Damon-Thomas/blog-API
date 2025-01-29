export default function blogPreview({title, content, updated, author, comments}) {
  const update = new Date(updated);

  return (
    <div className="post flex flex-col w-full md:w-2/5 p-2 md:p-5 rounded-md bg-white text-darkprimary mx-8 my-4  h-60 overflow-hidden">
      <div className="postFooter flex justify-between items-center h-1/5 border-b-2 border-primary">
        <p className="post author font-bold">@{author}</p>
        <p className="postLastUpdate">{update.toDateString()}</p>
      </div>
      <div className="postTitleContent h-3/5 flex flex-col gap-2 md:gap-4 pt-2">
        <h2 className="postTitle flex font-bold text-xl md:2xl ">{title}</h2>
        <p className="postContent text-sm">{content}</p>
      </div>
      <div className="postFooter h-1/5 flex items-center gap-2">
        <svg className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M9,9V11H19V9H9M9,13V15H17V13H9Z" /></svg>
        <p className="postComments font-bold">{comments}</p>
      </div>
    </div>
  )};