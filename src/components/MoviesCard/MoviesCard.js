import React from 'react'
import { useLocation } from 'react-router'

import './MoviesCard.css'
import Popup from '../Popup/Popup'
import { addToMyMoviesList, deleteFromMyMoviesList } from '../../utils/MainApi'
import Preloader from '../Preloader/Preloader'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'
import { CurrentUser } from '../../contexts/CurrentUserContext'


const MoviesCard = React.memo(({ movie, handleClickDeleteMovie }) => {

    const currentUser = React.useContext(CurrentUser)
    const location = useLocation()
    const [duration, setDuration] = React.useState('')
    const [saved, setSaved] = React.useState(movie.owner === currentUser._id)
    const [mouseOver, setMouseOver] = React.useState(false)
    const [showTrailer, setShowTrailer] = React.useState(false)
    const [videoUrlForPopup, setVideoUrlForPopup] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [validField, setValidField] = React.useState(true)

    React.useEffect(() => {
        const dur = Number(movie.duration)
        const h = Math.floor(dur / 60)
        const m = Math.floor(dur % 60)
        setDuration(`${h}ч ${m}м`)
    }, [movie.duration])


    React.useEffect(() => {
        for (const key in movie) {
            if (movie[key] === '' || movie[key] === null) {
                console.log(`Недопустимое поле фильма - ${key}`)
            }
            else {
                // movie.trailerLink
                // &&
                (movie.trailerLink.indexOf('http') === -1) // регулярку <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    ?
                    setMessage('К сожалению трейлер недоступен...')
                    :
                    (movie.trailerLink.indexOf('v=') > -1)
                    &&
                    setVideoUrlForPopup(movie.trailerLink.split('v=')[1])
            }
        }
    }, [])


    const handleClick = () => {
        console.log(movie)
        setShowTrailer(true)
    }

    const updateMainList = (savedMovie) => {
        const mainMoviesList = JSON.parse(localStorage.getItem('moviesList'))
        const updatedMovieIndex = mainMoviesList.findIndex(existedMovie => existedMovie.id === savedMovie.id)

        // начиная с updatedMovieIndex удалить 1 элемент и заменить его в mainMoviesList
        mainMoviesList.splice(updatedMovieIndex, 1, savedMovie);

        console.log('обновил localStorage')
        // обновил осн. список фильмов в localStorage
        localStorage.setItem('moviesList', JSON.stringify(mainMoviesList))
    }

    const clickSaved = () => {
        for (const key in movie) {
            if (movie[key] === '' || movie[key] === null) {
                setValidField(false) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< не успевает обновится!!!!!!!!!!!!!!!!!!!!!
                console.log(`Недопустимое поле при сохранении фильма - ${key}`)
                setInfoTooltipOpen(true)
                setMessage('Ошибка при добавлении фильма')
            }
            else {
                setValidField(true)
            }
        }
        if (validField) {
            setIsSubmitting(true)
            addToMyMoviesList(movie)
                .then((savedMovie) => {
                    setSaved(true)
                    updateMainList(savedMovie)
                })
                .catch((err) => {
                    console.log(err)
                    setInfoTooltipOpen(true)
                    setMessage('Ошибка при добавлении фильма')
                })
                .finally(() => setIsSubmitting(false))
        }
        setValidField(true)
    }


    const clickDelete = () => {
        setIsSubmitting(true)
        deleteFromMyMoviesList(movie._id)
            .then((deletedMovie) => {
                // console.log(deletedMovie)
                const { owner, _id, __v, ...savedMovie } = deletedMovie // обновил объект карточки фильма без owner и _id
                updateMainList(savedMovie)
                console.log(savedMovie)
                setSaved(false)
                handleClickDeleteMovie()
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
        <section className='movie'>

            {isSubmitting && <Preloader />}

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
                        onClick={handleClick}
                        onMouseOver={() => setMouseOver(true)}
                        onMouseLeave={() => setMouseOver(false)}
                        src={
                            !movie.image.url ? // при обратном сохранении поля movie.image.url уже нет (api вернул movie.image)
                                movie.image
                                :
                                `https://api.nomoreparties.co${movie.image.url}`
                        }
                        alt='карточка фильма'
                    />
                    :
                    <a className='movie__trailer-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
                        <img
                            className='movie__image'
                            onMouseOver={() => setMouseOver(true)}
                            onMouseLeave={() => setMouseOver(false)}
                            src={
                                location.pathname === '/saved-movies' ?
                                    movie.image
                                    :
                                    `https://api.nomoreparties.co${movie.image.url}`
                            }
                            alt='карточка фильма'
                        />
                    </a>
            }
            <div className='movie__bottom-container'>
                <h3 className='movie__caption'>{movie.nameRU}</h3>
                <p className='movie__duration'>{duration}</p>
            </div>
            {
                location.pathname === '/saved-movies' &&
                <button
                    className={`movie__favorites movie__favorites_delete ${mouseOver && 'movie__favorites_delete-active'}`}
                    onMouseOver={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                    onClick={clickDelete}
                    aria-label='удаление из избранного'
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
                    >
                    </button>
                    :
                    <button
                        className=
                        {`movie__favorites movie__favorites_false ${mouseOver && 'movie__favorites_false-active'} ${saved && 'movie__favorites_hidden'}`}
                        onMouseEnter={() => setMouseOver(true)}
                        onClick={clickSaved}
                        aria-label='добавить в избранное'
                    >
                        Сохранить
                    </button>)
            }
            {showTrailer && <Popup
                closePopup={closePopup}
                buttonClose={true}
                Content={
                    <div className='movie__trailer-container'>
                        {
                            message ?
                                <p className='movie__message'>{message}</p>
                                :
                                <iframe
                                    className='movie__trailer'
                                    title='random-video'
                                    type='text/html'
                                    src={`https://www.youtube.com/embed/${videoUrlForPopup}`}
                                    frameBorder='0'
                                    allowFullScreen
                                >
                                </iframe>
                        }
                    </div>
                }
            />}

        </section>
    )
})

export default MoviesCard