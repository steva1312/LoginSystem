import React from 'react'

function Burger({ toggleNav }) {
  return (
    <div onClick={toggleNav} className='burger'>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Burger
