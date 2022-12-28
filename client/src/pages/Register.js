import React, { useRef, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
const REGISTER_URL = 'register'

function Register() {
  useTitle('Register')

  const usernameRef = useRef()
  const passwordRef = useRef()
  const passwordRef2 = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [messages, setMessages] = useState([])

  const { isAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await axios.post(REGISTER_URL, { username, password })
    if (response.data.messages.length === 0) {
      navigate('/login')
    }
    setMessages(response.data.messages)
  }

  return (
    <div>
      {isAuth ? <Navigate to='/' /> : null}

      <h1>Register</h1>

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

        <label htmlFor='password2'>Confirm assword:</label>
        <input
          type='password'
          id='password2'
          ref={passwordRef2}
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />

        <button>Register</button>
      </form>

      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}

      <p>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </div>
  )
}

export default Register
