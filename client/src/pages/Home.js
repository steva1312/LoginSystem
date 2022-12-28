import React from 'react'
import { useAuth } from '../context/AuthContext'
import useTitle from '../hooks/useTitle'

function Home() {
  useTitle('Home')

  const { isAuth, user } = useAuth()

  return <h1>{isAuth ? `Hello ${user.username}!` : 'Home'}</h1>
}

export default Home
