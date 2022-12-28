import { createContext, useContext, useEffect, useState } from 'react'
import { RouterProvider, useNavigate } from 'react-router-dom'

import axios from '../api/axios'
const VALIDATE_URL = '/validate'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const checkAuth = async () => {
    const token = localStorage.getItem('token')

    if (!token) return

    const response = await axios.get(VALIDATE_URL, {
      headers: {
        authorization: token,
      },
    })

    if (response.data.user) {
      authorize(response.data.user)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  function authorize(userObj) {
    setIsAuth(true)
    setUser(userObj)
  }

  function deauthorize() {
    setIsAuth(false)
    setUser(null)
    localStorage.setItem('token', '')
    navigate('/login')
  }

  return <AuthContext.Provider value={{ isAuth, user, authorize, deauthorize }}>{children}</AuthContext.Provider>
}
