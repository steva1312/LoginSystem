import React, { useEffect, useRef, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import axios from '../api/axios'
const LOGIN_URL = 'login'

function translateMessages(messages) {
  const m = []

  messages.forEach(message => {
    switch (message) {
      case 'USER_NOT_FOUND':
        m.push('There is no user using that email.')
        break
      case 'WRONG_PASSWORD':
        m.push('Wrong password.')
        break
      case 'NOT_CONFIRMED':
        m.push('Please confirm your email before you login.')
        break
      default:
        m.push('Something went wrong.')
    }
  })

  return m
}

function Login() {
  useTitle('Log In')

  const emailRef = useRef()
  const passwordRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])

  const { user, authorize } = useAuth()

  const searchParams = useSearchParams()[0]

  useEffect(() => {
    if (searchParams.get('confirmed') === 'true') {
      setMessages(['Email successfuly confirmed! You can login now.'])
    }
  }, [searchParams])

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await axios.post(LOGIN_URL, { email, password })
    const msg = response.data.messages

    if (msg.length > 0) setMessages(translateMessages(msg))

    localStorage.setItem('token', `Bearer ${response.data.accessToken}`)

    authorize()
  }

  return (
    <div>
      {user ? <Navigate to='/' /> : null}

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} required />

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

      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}

      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
      <Link to='/forgot'>Forgot password?</Link>
    </div>
  )
}

export default Login
