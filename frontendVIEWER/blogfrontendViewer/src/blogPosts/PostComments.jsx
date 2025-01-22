import Comment from "./Comment";
import PropTypes from 'prop-types';

function PostComments({comments}) {
  return (
    <div className="commentsContainer">
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}

PostComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      comment: PropTypes.object.isRequired,

    })
  )}

export default PostComments;