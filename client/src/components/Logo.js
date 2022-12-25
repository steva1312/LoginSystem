import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'

function Logo() {
  return (
    <Link to='/'>
      <img src={logo} className='logo' alt='logo' />
    </Link>
  )
}

export default Logo
