import PropTypes from 'prop-types';
import PostComments from './PostComments';

function Post({ title, content }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <PostComments />
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Post;