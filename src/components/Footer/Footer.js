import React from 'react'
import './Footer.css'

const Footer = React.memo(() => {

    const date = new Date();

    return (
        <footer className="footer">
            <h4 className="footer__information">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <p className="footer__copyright">&copy; {date.getFullYear()}</p>
            <ul className="footer__links-list">
                <li>
                    <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                </li>
                <li>
                    <a className="footer__link" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
                </li>
                <li>
                    <a className="footer__link" href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                </li>
            </ul>
        </footer>
    );
});

export default Footer;