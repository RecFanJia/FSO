import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formVisible, setFormVisible] = useState(false)
  const [loginFormVisible, setLoginFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    console.log('Blogs state updated:', blogs)
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome ${user.name}`)
      setMessageType('notification')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setLoginFormVisible(false) // Hide login form on successful login
    } catch (exception) {
      setMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setMessage('Logged out')
    setMessageType('notification')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlogObject = {
        ...blogObject,
        user: {
          id: user.id,
          username: user.username,
          name: user.name
        }
      }
      console.log('New blog object being sent to server:', newBlogObject)

      const returnedBlog = await blogService.create(newBlogObject)
      console.log('Returned blog object from server:', returnedBlog)
      const blogWithFullUser = {
        ...returnedBlog,
        user: {
          id: user.id,
          username: user.username,
          name: user.name
        }
      }

      setBlogs(prevBlogs => {
        const updatedBlogs = prevBlogs.concat(blogWithFullUser)
        console.log('Updated blogs after creation:', updatedBlogs)
        return updatedBlogs
      })

      setMessage(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
      setMessageType('notification')

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to create blog')
      setMessageType('error')

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = updatedBlog => {
    setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)))
  }

  const removeBlog = id => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      {user === null ? (
        <div>
          {!loginFormVisible && (
            <div>
              <p>Not logged in</p>
              <button onClick={() => setLoginFormVisible(true)}>login</button>
            </div>
          )}
          {loginFormVisible && (
            <LoginForm
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
              username={username}
              password={password}
              message={message}
              messageType={messageType}
              handleCancel={() => setLoginFormVisible(false)}
            />
          )}
        </div>
      ) : (
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {formVisible ? (
            <BlogForm createBlog={createBlog} user={user} handleCancel={() => setFormVisible(false)} />
          ) : (
            <button onClick={() => setFormVisible(true)}>create new blog</button>
          )}
        </div>
      )}
      <div>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
