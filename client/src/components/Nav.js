import React from 'react'
import { Link } from 'react-router-dom'

function Nav({ isOpen, toggleNav }) {
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
      </ul>

      <div onClick={toggleNav} className='x'>
        X
      </div>
    </nav>
  )
}

export default Nav
