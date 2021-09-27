import React from 'react'
import { Link } from 'react-router-dom'
import './GridArea.css'
import photo from '../../images/photo.jpg'
import arrow from '../../images/arrow.svg'


const GridArea = React.memo(() => {

    return (
        <article className='grid-area'>

            <img className='grid-area__photo' src={photo} alt='Фото пользователя' />

            <div className='grid-area__info'>
                <h3 className='grid-area__info-name'>Юрий</h3>
                <h4 className='grid-area__info-about'>Фронтенд-разработчик, 43 года</h4>
                <p className='grid-area__info-text'>
                    Я живу в Москве, у меня высшее юридическое образование, но основной отрезок
                    профессиональной карьеры пришёлся на строительную сферу. У меня есть жена и четыре прекрасных ребёнка.
                    Мне нравится смотреть хорошее кино и путешествовать с семьёй. Недавно я открыл для себя ещё одно увлечение - кодить.
                    И после того, как прошёл курс по веб-разработке, решил полностью посвятить себя любимому делу.
                </p>
                <ul className='grid-area__info-links-list'>
                    <li className='grid-area__links-item'>
                        <Link to={{ pathname: 'https://www.facebook.com' }} className='grid-area__info-link' target='_blank'>Facebook</Link>
                    </li>
                    <li className='grid-area__links-item'>
                        <Link to={{ pathname: 'https://github.com/yuryavdeev' }} className='grid-area__info-link' target='_blank'>Github</Link>
                    </li>
                </ul>
            </div>

            <div className='grid-area__portfolio'>
                <h3 className='grid-area__portfolio-title'>Портфолио</h3>
                <ul className='grid-area__portfolio-links-list'>
                    <li className='grid-area__links-item'>
                        <p className='grid-area__portfolio-name'>Статичный сайт</p>
                        <Link to={{ pathname: 'https://github.com/yuryavdeev/how-to-learn' }} className='grid-area__portfolio-link' target='_blank'>
                            <img className='grid-area__portfolio-arrow' src={arrow} alt='ссылка в виде стрелки' />
                        </Link>
                    </li>
                    <hr className='grid-area__portfolio-border'></hr>
                    <li className='grid-area__links-item'>
                        <p className='grid-area__portfolio-name'>Адаптивный сайт</p>
                        <Link to={{ pathname: 'https://yuryavdeev.github.io/russian-travel/index.html' }} className='grid-area__portfolio-link' target='_blank'>
                            <img className='grid-area__portfolio-arrow' src={arrow} alt='ссылка в виде стрелки' />
                        </Link>
                    </li>
                    <hr className='grid-area__portfolio-border'></hr>
                    <li className='grid-area__links-item'>
                        <p className='grid-area__portfolio-name'>Одностраничное приложение</p>
                        <Link to={{ pathname: 'https://yuryavdeev.github.io/mesto-react/' }} className='grid-area__portfolio-link' target='_blank'>

                            <img className='grid-area__portfolio-arrow' src={arrow} alt='ссылка в виде стрелки' />
                        </Link>
                    </li>
                </ul>
            </div>

        </article >
    )
})

export default GridArea