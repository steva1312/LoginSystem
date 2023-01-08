import React, { useRef, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'

import axios from '../api/axios'
const CHANGE_FORGOTTEN_PASSWORD_URL = 'change-forgotten-password'

function translateMessages(messages) {
  const m = []

  messages.forEach(message => {
    switch (message) {
      case 'INVALID_PASSWORD':
        m.push('Password must be beetween 6 and 32 characters long.')
        break
      case 'INVALID_TOKEN':
        m.push('Please use the link we sent you.')
        break
      default:
        m.push('Something went wrong.')
    }
  })

  return m
}

function ChangeForgottenPassword() {
  useTitle('Change Password')

  const passwordRef = useRef()

  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])

  const { user } = useAuth()

  const searchParams = useSearchParams()[0]

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await axios.post(CHANGE_FORGOTTEN_PASSWORD_URL, { password, token: searchParams.get('token') })
    const msg = response.data.messages

    if (msg.length > 0) setMessages(translateMessages(msg))
    else setMessages(['Password changed successfuly! You can log in now.'])
  }

  return (
    <div>
      {user ? <Navigate to='/' /> : null}

      <h1>Change Password</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='password'>New password:</label>
        <input
          type='password'
          id='password'
          ref={passwordRef}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button>Send mail</button>
      </form>

      {messages.map((message, i) => (
        <p key={i}>{message}</p>
      ))}
    </div>
  )
}

export default ChangeForgottenPassword
