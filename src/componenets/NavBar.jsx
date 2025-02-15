import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex flex-row gap-11'>
      <NavLink  to="/" >Home</NavLink>
      <NavLink to="/pastes">Pastes</NavLink>
    </div>
  )
}

export default NavBar
