
import PropTypes from 'prop-types';


function PostPreview({title, author, content, date}) {
    const previewContent = content.substring(0, 100) + '...'
    console.log('content',previewContent)
   

  return (
    <div>
      <h1 className="postPreviewTitle">{title}</h1>
      <h4 className="postPreviewAuthor">{author}</h4>
      <p className="postPreviewLastUpdated">{date}</p>
      <p className="postPreview">{content}</p>
    </div>
  );
}

PostPreview.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}
  
    

export default PostPreview;