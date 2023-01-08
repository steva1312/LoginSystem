import React, { useRef, useState } from 'react'
import useTitle from '../hooks/useTitle'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

import axios from '../api/axios'
const FORGOT_URL = 'forgot'

function translateMessages(messages) {
  const m = []

  messages.forEach(message => {
    switch (message) {
      case 'USER_NOT_FOUND':
        m.push('There is no user using that email.')
        break
      case 'NOT_CONFIRMED':
        m.push('Please confirm your email before you change your password.')
        break
      default:
        m.push('Something went wrong.')
    }
  })

  return m
}

function Forgot() {
  useTitle('Forgot password')

  const emailRef = useRef()

  const [email, setEmail] = useState('')
  const [messages, setMessages] = useState([])
  const [sent, setSent] = useState(false)

  const { user } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await axios.post(FORGOT_URL, { email })
    const msg = response.data.messages

    if (msg.length > 0) setMessages(translateMessages(msg))
    else {
      setMessages([])
      setSent(true)
    }
  }

  return (
    <div>
      {user ? <Navigate to='/' /> : null}

      <h1>Forgot Password</h1>

      <p>
        Enter the email you used to register your account. You will receive a mail that contains link to change your
        password.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} required />

        {sent ? <p>Check your email!</p> : <button>Send mail</button>}
      </form>

      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
    </div>
  )
}

export default Forgot
