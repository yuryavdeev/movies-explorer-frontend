import React from 'react'
import { useLocation } from 'react-router'

import './MoviesCard.css'
import Popup from '../Popup/Popup'
import { addToMyMoviesList, deleteFromMyMoviesList } from '../../utils/MainApi'
import Preloader from '../Preloader/Preloader'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'
import { CurrentUser } from '../../contexts/CurrentUserContext'

const MoviesCard = React.memo(({ incomingMovie }) => {

    const currentUser = React.useContext(CurrentUser)
    const location = useLocation()
    const [movie, setMovie] = React.useState(incomingMovie)
    const [duration, setDuration] = React.useState('')
    const [saved, setSaved] = React.useState(movie.owner === currentUser._id)
    const [mouseOver, setMouseOver] = React.useState(false)
    const [showTrailer, setShowTrailer] = React.useState(false)
    const [videoUrlForPopup, setVideoUrlForPopup] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [hasEmptyField, setHasEmptyField] = React.useState('')


    React.useEffect(() => {
        const dur = Number(movie.duration)
        const h = Math.floor(dur / 60)
        const m = Math.floor(dur % 60)
        setDuration(`${h}ч ${m}м`)
    }, [movie.duration])


    React.useEffect(() => {
        for (const key in movie) {
            if (movie[key] === '' || movie[key] === null) {
                console.log(`Пустое поле фильма ${key} у фильма - ${movie.nameRU}`)
                setHasEmptyField(key)
            }
        }

        if (movie.trailerLink) {
            (movie.trailerLink.indexOf('http') === -1)
                ?
                setMessage('К сожалению трейлер недоступен...')
                :
                (movie.trailerLink.indexOf('v=') > -1)
                &&
                setVideoUrlForPopup(movie.trailerLink.split('v=')[1])

        }
    }, [])


    // при удалении или добавл. фильма в избранное
    const updateMainList = (savedMovie) => {
        const mainMoviesList = JSON.parse(localStorage.getItem('moviesList'))
        const updatedMovieIndex = mainMoviesList.findIndex(existedMovie => existedMovie.id === savedMovie.id)
        // начиная с updatedMovieIndex удалить 1 элемент и заменить его в mainMoviesList:
        mainMoviesList.splice(updatedMovieIndex, 1, savedMovie)
        // обновил осн. список фильмов в localStorage
        localStorage.setItem('moviesList', JSON.stringify(mainMoviesList))
    }


    const clickSaved = () => {
        if (hasEmptyField) {
            console.log(`Недопустимое поле при сохранении фильма - ${hasEmptyField}`)
            setInfoTooltipOpen(true)
            setMessage('Ошибка при добавлении фильма')
        } else {
            setIsSubmitting(true)
            addToMyMoviesList(movie)
                .then((savedMovie) => {
                    setSaved(true)
                    setMovie(savedMovie) // <<<<<<<<<<<<< при перепоиске беру initial... => не д.б. значка что сохранил..... разобраться....>>>>....{}
                    updateMainList(savedMovie)
                    // console.log(savedMovie)
                })
                .catch((err) => {
                    console.log(err)
                    setInfoTooltipOpen(true)
                    setMessage('Ошибка при добавлении фильма')
                })
                .finally(() => setIsSubmitting(false))
        }
    }


    const clickDelete = () => {
        setIsSubmitting(true)
        deleteFromMyMoviesList(movie._id)
            .then((deletedMovie) => {
                const { owner, _id, __v, ...savedMovie } = deletedMovie // обновил объект карточки фильма без owner и _id
                updateMainList(savedMovie)
                setSaved(false)
                location.pathname === '/saved-movies' ?
                    setMovie('')
                    :
                    setMovie(savedMovie)
                // console.log(savedMovie)
            })
            .catch((err) => {
                console.log(err)
                setInfoTooltipOpen(true)
                setMessage('Во время удаления фильма произошла ошибка')
            })
            .finally(() => setIsSubmitting(false))
    }


    const closePopup = () => {
        setShowTrailer(false)
        setInfoTooltipOpen(false)
        setMessage('')
    }

    return (
        movie &&
        <section className='movie'>

            {
                isSubmitting && <Preloader />
            }

            {
                infoTooltipOpen &&
                <InfoTooltip
                    closePopup={closePopup}
                    icon={UnionX}
                    notification={message}
                />
            }

            {
                (videoUrlForPopup || message) ?
                    <img
                        className='movie__image'
                        onClick={() => setShowTrailer(true)}
                        onMouseOver={() => setMouseOver(true)}
                        onMouseLeave={() => setMouseOver(false)}
                        // при обратном сохранении api вернул movie.image без url
                        src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
                        alt='карточка фильма'
                    />
                    :
                    <a className='movie__trailer-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
                        <img
                            className='movie__image'
                            onMouseOver={() => setMouseOver(true)}
                            onMouseLeave={() => setMouseOver(false)}
                            src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
                            alt='карточка фильма'
                        />
                    </a>
            }

            <div className='movie__bottom-container'>
                <h3 className='movie__caption'>{movie.nameRU}</h3>
                <p className='movie__duration'>{duration}</p>
            </div>

            {
                location.pathname === '/saved-movies' ?
                    <button
                        className={`movie__favorites movie__favorites_delete ${mouseOver && 'movie__favorites_delete-active'}`}
                        onMouseOver={() => setMouseOver(true)}
                        onMouseLeave={() => setMouseOver(false)}
                        onClick={clickDelete}
                        aria-label='удаление из избранного'
                    >
                    </button>
                    :
                    saved ?
                        <button
                            className='movie__favorites movie__favorites_true'
                            onClick={clickDelete}
                            aria-label='удаление из избранного'
                        >
                        </button>
                        :
                        <button
                            className=
                            {`movie__favorites movie__favorites_false ${mouseOver && 'movie__favorites_false-active'} ${saved && 'movie__favorites_hidden'}`}
                            onMouseOver={() => setMouseOver(true)}
                            onClick={clickSaved}
                            aria-label='добавить в избранное'
                        >
                            Сохранить
                        </button>
            }

            {
                showTrailer &&
                <Popup
                    closePopup={closePopup}
                    buttonClose={true}
                    Content=
                    {
                        <div className='movie__trailer-container'>
                            {
                                message ?
                                    <p className='movie__message'>{message}</p>
                                    :
                                    <iframe
                                        className='movie__trailer'
                                        title='trailer-video'
                                        type='text/html'
                                        src={`https://www.youtube.com/embed/${videoUrlForPopup}`}
                                        frameBorder='0'
                                        allowFullScreen
                                    >
                                    </iframe>
                            }
                        </div>
                    }
                />
            }

        </section>
    )
})

export default MoviesCard