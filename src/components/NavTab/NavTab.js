import { memo } from 'react'
import { HashLink } from 'react-router-hash-link'
import './NavTab.css'

const NavTab = memo(() => {
  return (
    <nav className='nav-tab'>
      <HashLink smooth to='/about/#about-project' className='nav-tab__link'>
        About project
      </HashLink>
      <HashLink smooth to='/about/#techs' className='nav-tab__link'>
        Technologies
      </HashLink>
      <HashLink smooth to='/about/#about-me' className='nav-tab__link'>
        About me
      </HashLink>
    </nav>
  )
})

export default NavTab
