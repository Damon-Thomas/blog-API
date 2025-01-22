
import PostComments from './PostComments';




function Post(title, content, comments) {
  return (
    <div>
      <div className="postContainer">
        <h1 className='postTitle'>{title}</h1>
        <p className='postContent'>{content}</p>
      </div>

      <PostComments comments={comments}  />
    </div>
  );
}

export default Post;