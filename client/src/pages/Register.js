import React, { useRef, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
const REGISTER_URL = 'register'

function translateMessages(messages) {
  const m = []

  messages.forEach(message => {
    switch (message) {
      case 'INVALID_PASSWORD':
        m.push('Password must be beetween 6 and 32 characters long.')
        break
      case 'INVALID_EMAIL':
        m.push('Email format is incorrect.')
        break
      case 'EMAIL_REGISTERED':
        m.push('This email is already in use.')
        break
      default:
        m.push('Something went wrong...')
    }
  })

  return m
}

function Register() {
  useTitle('Register')

  const emailref = useRef()
  const passwordRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])

  const { isAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await axios.post(REGISTER_URL, { email, password })
    if (response.data.messages.length === 0) {
      navigate('/login')
    }
    setMessages(translateMessages(response.data.messages))
  }

  return (
    <div>
      {isAuth ? <Navigate to='/' /> : null}

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='emial'>Email:</label>
        <input type='text' id='email' ref={emailref} value={email} onChange={e => setEmail(e.target.value)} required />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          ref={passwordRef}
          value={password}
          onChange={e => setPassword(e.target.value)}
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
