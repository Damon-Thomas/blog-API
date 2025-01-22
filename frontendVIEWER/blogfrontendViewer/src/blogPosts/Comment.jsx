

function Comment(author, content) {
  return (
    <div className="commentContainer">
      <h3 className="commentUsername">{author}</h3>
      <p className="commentContent">{content}</p>
    </div>
  );
}
export default Comment;