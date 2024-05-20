import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    console.log('handleLike called')

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      const blogWithFullUser = {
        ...returnedBlog,
        user: blog.user
      }

      console.log('Blog updated successfully:', blogWithFullUser)
      updateBlog(blogWithFullUser)
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const handleDelete = async () => {
    if (!currentUser) {
      alert('You need to log in to delete')
      return
    }

    if (blog.user.username !== currentUser.username) {
      alert('This blog is not added by the current logged-in user')
      return
    }

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        removeBlog(blog.id)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
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
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
}

export default Blog
