import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NavTab.css';

const NavTab = React.memo(() => {
    return (
        <nav className='nav-tab'>

            <HashLink smooth to='/#about-project' className='nav-tab__link'>
                О проекте
            </HashLink>

            <HashLink smooth to='/#techs' className='nav-tab__link'>
                Технологии
            </HashLink>

            <HashLink smooth to='/#about-me' className='nav-tab__link'>
                Обо мне
            </HashLink>

        </nav>
    )
});

export default NavTab;