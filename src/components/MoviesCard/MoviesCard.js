import React from 'react';
import { useLocation } from 'react-router';

import './MoviesCard.css';
import Popup from '../Popup/Popup';

const MoviesCard = React.memo(({ movie }) => {

    const location = useLocation()
    const [duration, setDuration] = React.useState('')
    const [saved, setSaved] = React.useState(movie.saved)
    const [mouseOver, setMouseOver] = React.useState(false)
    const [showTrailer, setShowTrailer] = React.useState(false)

    React.useEffect(() => {
        const dur = Number(movie.duration);
        const h = Math.floor(dur / 60);
        const m = Math.floor(dur % 60);
        setDuration(`${h}ч ${m}м`)
    }, []);

    const handleClick = () => {
        setShowTrailer(true)
        console.log('Показ трейлера к фильму') // попап
    }

    const clickSaved = () => {
        setSaved(true)
        console.log('POST + получить новый массив')
        // setMouseOver(!mouseOver)
    }

    const clickDelete = () => {
        setSaved(false)
        console.log('DELETE + получить новый массив')
        // setMouseOver(!mouseOver)
    }

    const closePopup = () => {
        setShowTrailer(false)
    }

    return (
        <section className='movie'>

            <img
                className="movie__image"
                onClick={handleClick}
                onMouseEnter={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
                src={movie.url}
                alt='карточка фильма'
            />
            <div className='movie__bottom-container'>
                <h3 className="movie__caption">{movie.name}</h3>
                <p className="movie__duration">{duration}</p>
            </div>
            {
                location.pathname === '/saved-movies' &&
                <button
                    className={`movie__favorites movie__favorites_delete ${mouseOver && 'movie__favorites_delete-active'}`}
                    onMouseEnter={() => setMouseOver(true)}
                    onClick={clickDelete}
                    aria-label='удаление из избранного'
                // onMouseEnter={() => setMouseOver(true)}
                // style={!mouseOver ? { backgroundImage: `url(${iconFavorites})` } : { backgroundImage: `url(${iconFavoritesDelete})` }}
                >
                </button>
            }

            {
                location.pathname === '/movies' &&
                (saved ?
                    <button
                        className='movie__favorites movie__favorites_true'
                        onClick={clickDelete}
                        aria-label='удаление из избранного'
                    // onMouseEnter={() => setMouseOver(true)}
                    // style={!mouseOver ? { backgroundImage: `url(${iconFavorites})` } : { backgroundImage: `url(${iconFavoritesDelete})` }}
                    >
                    </button>
                    :
                    <button
                        className=
                        {`movie__favorites movie__favorites_false ${mouseOver && 'movie__favorites_false-active'} ${saved && 'movie__favorites_hidden'}`}
                        onMouseEnter={() => setMouseOver(true)}
                        onClick={clickSaved}
                        aria-label='добавить в избранное'
                    >Сохранить
                    </button>)
            }
            {showTrailer && <Popup
                popupIsOpen={showTrailer}
                closePopup={closePopup}
                Content={
                    <div className='trailer'>
                        <iframe
                            title="random-video"
                            type="text/html"
                            width="720"
                            height="405"
                            src="https://www.youtube.com/embed/M7lc1UVf-VE"
                            frameborder="0"
                            allowfullscreen
                        >
                        </iframe>
                    </div>
                }
                buttonClose={true}
            />}

        </section>
    )
});

export default MoviesCard;