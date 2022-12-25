import React, { useState } from 'react'
import Logo from './Logo'
import Nav from './Nav'
import Burger from './Burger'
import Cover from './Cover'
import '../css/header.css'

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(prev => !prev)
  }

  return (
    <header>
      <Logo />
      <Nav isOpen={isNavOpen} toggleNav={toggleNav} />
      <Burger toggleNav={toggleNav} />
      <Cover isShow={isNavOpen} close={toggleNav} />
    </header>
  )
}

export default Header
