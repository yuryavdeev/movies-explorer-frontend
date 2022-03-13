import { memo, useContext, useState, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'
import menuImage from '../../images/icon-menu.svg'
import Navigation from '../Navigation/Navigation'
import Popup from '../Popup/Popup'
import { CurrentUser } from '../../contexts/CurrentUserContext'


const Header = memo(() => {
  const currentUser = useContext(CurrentUser)
  const location = useLocation() // или > { pathname } = useLocation()
  const history = useHistory()
  const [navigationPopup, setNavigationPopup] = useState(false)
  const resolution = window.matchMedia('(min-width: 800px)') // медиа-запрос в конст., возвр. объект
  const [viewportWidth, setViewportWidth] = useState(resolution.matches) // св-во объекта ответа - true - если document сейчас соот-т медиа-запросу


  useEffect(() => {
    resolution.onchange = () => { // переход через 800рх
      resolution.matches ? // => true / false
        setViewportWidth(true)
        :
        setViewportWidth(false)
    }
    return resolution.onchange
  }, [resolution])


  const openPopup = () => {
    setNavigationPopup(true)
  }


  const closePopup = () => {
    setNavigationPopup(false)
  }


  return (
    <header className={`header ${location.pathname === '/' && 'header__type_color'}`}>

      <div className='header__wrap'>
        <img className='logo' src={logo} onClick={() => history.push('/')} alt='логотип' />
        {
          !currentUser ?
            <nav className='header__nav-container'>
              <Link to='/signup' className='header__link_word' target='_self'>Registration</Link>
              <Link to='/signin' className='header__link_button' target='_self'>Login</Link>
            </nav>
            :
            <>
              {viewportWidth ?
                <Navigation />
                :
                <img className='header__nav-icon' src={menuImage} alt='иконка меню' onClick={openPopup} />
              }
            </>
        }
        {
          navigationPopup &&
          <Popup
            closePopup={closePopup}
            Content={<Navigation />}
            buttonClose={true}
            viewportWidth={viewportWidth}
          />
        }
      </div>

    </header >
  )
})

export default Header
