import React, { useRef, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { Link, Navigate } from 'react-router-dom'

import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
const LOGIN_URL = 'login'

function Login() {
  useTitle('Log In')

  const usernameRef = useRef()
  const passwordRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])

  const { isAuth, authorize } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await axios.post(LOGIN_URL, { username, password })
    if (response.data.user) {
      authorize(response.data.user)
    } else {
      setMessages(response.data.messages)
    }
  }

  return (
    <div>
      {isAuth ? <Navigate to='/' /> : null}

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={usernameRef}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          ref={passwordRef}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button>Log In</button>
      </form>

      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}

      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  )
}

export default Login
