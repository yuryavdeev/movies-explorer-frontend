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
    const [trailerVisible, setTrailerVisible] = React.useState(false)
    const [videoUrlForPopup, setVideoUrlForPopup] = React.useState('')
    const [messageErr, setMessageErr] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [hasEmptyField, setHasEmptyField] = React.useState('')


    React.useEffect(() => {
        for (const key in movie) {
            if (movie[key] === '' || movie[key] === null) {
                console.log(`Пустое поле ${key} у фильма - ${movie.nameRU}`)
                setHasEmptyField(key)
            }
        }
    }, [movie])


    React.useEffect(() => {
        const dur = Number(movie.duration)
        const h = Math.floor(dur / 60)
        const m = Math.floor(dur % 60)
        setDuration(`${h}ч ${m}м`)
    }, [movie.duration])


    React.useEffect(() => {
        if (hasEmptyField === 'trailerLink' || String(movie.trailerLink).indexOf('http') < 0) {
            setHasEmptyField('trailerLink') // для != http...
            setMessageErr(`Недопустимое поле фильма - ${hasEmptyField}`)
        } else {
            String(movie.trailerLink).indexOf('v=') > -1 &&
                setVideoUrlForPopup(String(movie.trailerLink).split('v=')[1])
        }
    }, [hasEmptyField, movie.trailerLink])


    const openPopupErr = (err) => {
        setMessageErr(`В ответе на Ваш запрос сервером возвращена ошибка - ${err}`)
        setInfoTooltipOpen(true)
    }


    const showTrailer = () => {
        !messageErr ? setTrailerVisible(true) : setInfoTooltipOpen(true)
    }


    const closePopup = () => {
        setTrailerVisible(false)
        setInfoTooltipOpen(false)
    }


    const updateLocalLists = (savedMovie) => {
        // осн. список фильмов - для корр. отображения лайков на /movies после нового поиска
        const baseMoviesList = JSON.parse(sessionStorage.getItem('baseMoviesList'))
        const movieIndex = baseMoviesList.findIndex(existedMovie => existedMovie.id === savedMovie.id)
        // начиная с movieIndex удалить 1 элемент и заменить его в baseMoviesList:
        baseMoviesList.splice(movieIndex, 1, savedMovie)
        // обновил список фильмов в sessionStorage
        sessionStorage.setItem('baseMoviesList', JSON.stringify(baseMoviesList))

        // список фильмов после поиска - для корр. загрузки на /movies после возврата
        let listOfFound = JSON.parse(localStorage.getItem('listOfFound'))
        const movIndex = listOfFound.findIndex(existedMovie => existedMovie.id === savedMovie.id)
        listOfFound.splice(movIndex, 1, savedMovie)
        localStorage.setItem('listOfFound', JSON.stringify(listOfFound))

        // список фильмов из избранного - для правильного отображения на /saved-movies после изменений списка на /movies
        let myFavoriteMoviesList = JSON.parse(localStorage.getItem('myFavoriteMoviesList'))
        // сохраняемый фильм =>
        if (savedMovie.owner === currentUser._id) {
            myFavoriteMoviesList = myFavoriteMoviesList.concat(savedMovie) // добавил
            localStorage.setItem('myFavoriteMoviesList', JSON.stringify(myFavoriteMoviesList)) // сохранил
        }
        // удаляемый фильм =>
        else {
            const index = myFavoriteMoviesList.findIndex(existedMovie => existedMovie.id === savedMovie.id) // <= индекс
            myFavoriteMoviesList.splice(index, 1) // <= удалил
            localStorage.setItem('myFavoriteMoviesList', JSON.stringify(myFavoriteMoviesList)) // сохранил
        }
    }


    const clickSaved = () => {
        if (hasEmptyField) {
            setMessageErr(`Недопустимое поле фильма - ${hasEmptyField}`)
            setInfoTooltipOpen(true)
        } else {
            setIsSubmitting(true)
            addToMyMoviesList(movie)
                .then((savedMovie) => {
                    setSaved(true)
                    setMovie(savedMovie)
                    updateLocalLists(savedMovie, currentUser._id)
                })
                .catch((err) => openPopupErr(err))
                .finally(() => setIsSubmitting(false))
        }
    }


    const clickDelete = () => {
        setIsSubmitting(true)
        deleteFromMyMoviesList(movie._id)
            .then((deletedMovie) => {
                const { owner, _id, __v, ...savedMovie } = deletedMovie // => объект фильма savedMovie без __v, owner и _id
                updateLocalLists(savedMovie, currentUser._id)
                setSaved(false)
                location.pathname === '/saved-movies' ?
                    setMovie('')
                    :
                    setMovie(savedMovie)
            })
            .catch((err) => openPopupErr(err))
            .finally(() => setIsSubmitting(false))
    }


    return (
        movie &&  // <= если удалил из избранного
        <section className='movie'>

            {
                (videoUrlForPopup || messageErr) ?
                    <img
                        className='movie__image'
                        onClick={() => showTrailer()}
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
                trailerVisible &&
                <Popup
                    closePopup={closePopup}
                    buttonClose={true}
                    Content={
                        <div className='movie__trailer-container'>
                            <iframe
                                className='movie__trailer'
                                title='trailer-video'
                                type='text/html'
                                src={`https://www.youtube.com/embed/${videoUrlForPopup}`}
                                frameBorder='0'
                                allowFullScreen>
                            </iframe>
                        </div>
                    }
                />
            }

            {isSubmitting && <Preloader />}

            {
                infoTooltipOpen &&
                <InfoTooltip
                    closePopup={closePopup}
                    icon={UnionX}
                    notification={messageErr}
                />
            }

        </section>
    )
})

export default MoviesCard