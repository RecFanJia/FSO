import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage(`Welcome ${user.name}`);
      setMessageType('notification');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Wrong username or password');
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
    setMessage('Logged out');
    setMessageType('notification');
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setMessage(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`);
      setMessageType('notification');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Failed to create blog');
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateBlog = updatedBlog => {
    setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {!formVisible && <button onClick={() => setFormVisible(true)}>create new blog</button>}
          {formVisible && (
            <div>
              <BlogForm createBlog={createBlog} />
              <button onClick={() => setFormVisible(false)}>cancel</button>
            </div>
          )}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      }
    </div>
  );
};

export default App;
