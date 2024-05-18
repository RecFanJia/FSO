import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog }) => {
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
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes 
          <button onClick={handleLike}>like</button>
        </p>
        <p>added by {blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
