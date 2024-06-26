const LoginForm = ({ handleLogin, setUsername, setPassword, username, password, handleCancel }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>cancel</button>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
