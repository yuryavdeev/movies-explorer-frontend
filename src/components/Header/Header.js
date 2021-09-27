import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import './Header.css'
import logo from '../../images/logo.svg'
import menuImage from '../../images/icon-menu.svg'
import Navigation from '../Navigation/Navigation'
import Popup from '../Popup/Popup'
import { CurrentUser } from '../../contexts/CurrentUserContext'

const Header = React.memo(() => {

    const location = useLocation() // или > { pathname } = useLocation()
    const history = useHistory()
    const currentUser = React.useContext(CurrentUser)

    const [navigationPopup, setNavigationPopup] = React.useState(false)
    const resolution = window.matchMedia('(min-width: 800px)') // медиа-запрос в конст., возвр. объект
    const [viewportWidth, setViewportWidth] = React.useState(resolution.matches) // св-во объекта ответа - true - если document сейчас соот-т медиа-запросу

    React.useEffect(() => {
        resolution.onchange = () => { // переход через 780рх
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
                <img className='header__logo' src={logo} onClick={() => history.push('/')} alt='логотип' />
                {
                    !currentUser ?
                        <nav className='header__nav-container'>
                            <Link to='/signup' className='header__link_word' target='_self'>Регистрация</Link>
                            <Link to='/signin' className='header__link_button' target='_self'>Войти</Link>
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