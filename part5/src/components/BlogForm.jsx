import { useState } from 'react'

const BlogForm = ({ createBlog, user, handleCancel }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: { id: user.id, username: user.username, name: user.name } // Include user information
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={handleSubmit} data-testid="blog-form">
      <h2>Create new blog</h2>
      <div>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          id="author"
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          id="url"
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleCancel} style={{ marginRight: '10px' }}>cancel</button>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm
