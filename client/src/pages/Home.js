import React from 'react'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'

function Home() {
  useTitle('Home')

  const { user } = useAuth()

  return <h1>{user ? `Hello ${user.email}!` : 'Home'}</h1>
}

export default Home
