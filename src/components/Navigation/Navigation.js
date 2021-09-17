import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import AccountImage from '../../images/account.svg'; // поменять путь ххххххххххххххххххххххххххххххххх

const Navigation = React.memo(() => {

    const location = useLocation(); // или > { pathname } = useLocation();
    // const [showNavSigninSignup, setShowNavSigninSignup] = React.useState('')

    // React.useEffect(() => {
    //     location.pathname === '/' ? setShowLink('Регистрация') : setShowLink('Войти');
    // }, [location]);

    return (

        <nav className="navigation__container">
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active" target="_self">
                Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active" target="_self">
                Сохранённые фильмы
            </NavLink>
            {/* сделать отд. контейнер, на меньших разреш. - отдельно, но + Главная */}
            <NavLink to="/profile" className="navigation__link" activeClassName="navigation__link_active" target="_self">
                Аккаунт
            </NavLink>
            <img className="navigation__profile-image" src={AccountImage} alt="заставка аккаунта" />
        </nav>
            // {/* <div className="navigation__menu-icon">☰</div> */ }

    // {/* (<Link className="navigation__button-auth" to={showLink === "Регистрация" ? "/react-mesto-auth/sign-up" : "/react-mesto-auth/sign-in"}>
    //             {showLink}
    //         </Link>) */}
    );
});

export default Navigation;