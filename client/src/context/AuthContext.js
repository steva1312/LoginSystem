import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

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
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, authorize, deauthorize }}>
      {children}
    </AuthContext.Provider>
  )
}
