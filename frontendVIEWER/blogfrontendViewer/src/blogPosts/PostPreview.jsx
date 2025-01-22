function PostPreview(title, author, content) {
    let previewContent = content.substring(0, 100) + '...';
  return (
    <div>
      <h1>{title}</h1>
      <p>{previewContent}</p>
    </div>
  );
}

export default PostPreview;