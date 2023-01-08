import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Header from './components/Header'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import { AuthProvider } from './context/AuthContext'
import './css/global.css'
import ChangeForgottenPassword from './pages/ChangeForgottenPassword'

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/change-forgotten-password' element={<ChangeForgottenPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
