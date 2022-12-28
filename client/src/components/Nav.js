import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Nav({ isOpen, toggleNav }) {
  const { isAuth, deauthorize } = useAuth()

  const closeNavByLink = () => {
    if (isOpen) {
      toggleNav()
    }
  }

  return (
    <nav className={isOpen ? 'nav-active' : ''}>
      <ul>
        <li>
          <Link onClick={closeNavByLink} to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link onClick={closeNavByLink} to='/about'>
            About
          </Link>
        </li>
        <li>
          <Link onClick={closeNavByLink} to='/contact'>
            Contact
          </Link>
        </li>
        <li>
          {!isAuth ? (
            <Link onClick={closeNavByLink} to='/login'>
              Log In
            </Link>
          ) : (
            <button onClick={deauthorize}>Log Out</button>
          )}
        </li>
      </ul>

      <div onClick={toggleNav} className='x'>
        X
      </div>
    </nav>
  )
}

export default Nav
