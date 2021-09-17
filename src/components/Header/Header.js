import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

const Header = React.memo(() => {

    const location = useLocation(); // или > { pathname } = useLocation();

    return (
        <header className={`header ${location.pathname === '/' && 'header__type_color'}`} >
            <Link to="/" target="_self">
                <img className="header__logo" src={logo} alt="логотип" />
            </Link>
            <Navigation />
        </header>
    );
});

export default Header;