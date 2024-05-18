import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    };

    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    updateBlog(returnedBlog);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id);
      removeBlog(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const detailStyle = {
    display: visible ? '' : 'none'
  };

  return (
    <div style={blogStyle}>
      <div>
        『{blog.title}』 + "{blog.author}"
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={detailStyle}>
        <p>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </p>
        <p>
          {blog.likes} likes 
          <button onClick={handleLike}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
