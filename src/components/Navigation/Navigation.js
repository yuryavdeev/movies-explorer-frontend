import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = memo(() => {
  const location = useLocation()

  return (
    <div className='navigation'>

      <nav className='navigation__container'>
        <NavLink to='/' className={`navigation__link navigation__link_main  ${location.pathname === '/' && 'navigation__link_active'}`} target='_self'>
          Main
        </NavLink>
        <NavLink to='/movies' className='navigation__link' activeClassName='navigation__link_active' target='_self'>
          Movies
        </NavLink>
        <NavLink to='/saved-movies' className='navigation__link' activeClassName='navigation__link_active' target='_self'>
          Saved Movies
        </NavLink>
      </nav>

      <div className='navigation__account-container'>
        <NavLink to='/profile' className='navigation__account-link' activeClassName='navigation__link_active' target='_self'>
          Account
        </NavLink>
        <div className='navigation__account-image'></div>
      </div>
    </div>
  )
})

export default Navigation
