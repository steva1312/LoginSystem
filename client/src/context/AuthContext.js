import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from '../api/axios'
const ME_URL = '/me'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    authorize()
  }, [])

  async function authorize() {
    const token = localStorage.getItem('token')

    if (!token) return

    const response = await axios.get(ME_URL, {
      headers: {
        authorization: token,
      },
    })

    if (response.data.user) setUser(response.data.user)
  }

  function deauthorize() {
    setUser(null)
    localStorage.setItem('token', '')
    navigate('/login')
  }

  return <AuthContext.Provider value={{ user, authorize, deauthorize }}>{children}</AuthContext.Provider>
}
