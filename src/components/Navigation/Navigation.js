import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
// import accountImage from '../../images/photo.jpg';

const Navigation = React.memo(() => {
    const location = useLocation();

    return (
        <div className='navigation'>

            <nav className='navigation__container'>
                <NavLink to='/' className={`navigation__link navigation__link_main  ${location.pathname === '/' && 'navigation__link_active'}`} target='_self'>
                    Главная
                </NavLink>
                <NavLink to='/movies' className='navigation__link' activeClassName='navigation__link_active' target='_self'>
                    Фильмы
                </NavLink>
                <NavLink to='/saved-movies' className='navigation__link' activeClassName='navigation__link_active' target='_self'>
                    Сохранённые фильмы
                </NavLink>
            </nav>

            <div className='navigation__account-container'>
                <NavLink to='/profile' className='navigation__account-link' activeClassName='navigation__link_active' target='_self'>
                    Аккаунт
                </NavLink>
                {/* <img className='navigation__account-image' src={accountImage} alt='заставка аккаунта' /> */}
                <div className='navigation__account-image'></div>

            </div>

        </div>
    );
});

export default Navigation;

