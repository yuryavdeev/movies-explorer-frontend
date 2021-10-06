import React from 'react'

import './Movies.css'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'
import { getMyMovies } from '../../utils/MainApi'


const Movies = React.memo(({ loggedIn }) => {

    const [initialMoviesList, setInitialMoviesList] = React.useState([]) // из апи
    const [moviesList, setMoviesList] = React.useState([])
    const [myMoviesList, setMyMoviesList] = React.useState([])
    const [queryString, setQueryString] = React.useState('')
    const [checkboxActive, setCheckboxActive] = React.useState(false)
    const [shortMoviesList, setShortMoviesList] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [startSearch, setStartSearch] = React.useState(false)


    // console.log('обновил movies')


    // изм списка всех фильмов
    React.useEffect(() => {
        localStorage.moviesList &&
            setInitialMoviesList(JSON.parse(localStorage.getItem('moviesList')))
        // console.log('Movie - переписал основной список')
    }, [checkboxActive]) // при удалении и сохр. фильмов и смене флажка обновить рабочий список 


    // обработка запроса от формы поиска 
    React.useEffect(() => {
        if (queryString) {
            const newList = initialMoviesList.filter((movie) =>
                movie && movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1
            )
            if (newList.length) {
                setMoviesList(newList)  // найденные фильмы в стейт
                setMessage('')
            } else {
                setMessage('Ничего не найдено')
            }
        }
        setIsSubmitting(false)
    }, [startSearch, checkboxActive, initialMoviesList])


    // обработка чекбокса
    React.useEffect(() => {
        if (checkboxActive && moviesList.length) {
            const newShortList =
                moviesList.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortMoviesList(newShortList)
                :
                setMessage('Ничего не найдено')
        } else {
            setShortMoviesList([])
        }
        console.log(shortMoviesList)

    }, [checkboxActive, moviesList])


    // сливаем два списка от двух API если localStorage.moviestList - пустой
    const updateLocalLists = (moviesFromAPI) => { // <<<<<<<<<<<<<<<<<<<<<<<<< нестабильно - м.б. через localstorage <<<<<<<<<<<<<<<
        myMoviesList.map((savedMovie) => {
            const updatedMovieIndex = moviesFromAPI.findIndex(existedMovie => existedMovie.id === savedMovie.id) // => index
            updatedMovieIndex > -1 &&
                // начиная с updatedMovieIndex удалить 1 элемент и заменить его на savedMovie
                moviesFromAPI.splice(updatedMovieIndex, 1, savedMovie);
            return moviesFromAPI
        })
        setInitialMoviesList(moviesFromAPI) // обновленный массив в стейт
        localStorage.setItem('moviesList', JSON.stringify(moviesFromAPI)) // обновленный массив в localStorage
        setStartSearch(!startSearch) // запуск поиска
    }


    const getLocalLists = (moviesFromAPI) => {
        console.log('updateLocalLists')
        setIsSubmitting(true)
        getMyMovies()
            .then((myMovies) => {
                setMyMoviesList(myMovies)
                updateLocalLists(moviesFromAPI)
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }


    // запрос - ч/з арi или из localstorage
    const handleSubmitSearchForm = (query) => {
        if (query !== queryString) {
            setIsSubmitting(true)
            setQueryString(query)
        }
        if (initialMoviesList.length) { // список из localStorage при монтировании
            setStartSearch(!startSearch)
        } else {
            moviesApi.getMovies()
                .then((moviesFromAPI) => {
                    getLocalLists(moviesFromAPI)
                })
                .catch((err) => {
                    console.log(err)
                    setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                    setInfoTooltipOpen(true)
                })
                .finally(() => setIsSubmitting(false))
        }
    }


    const handleCheckboxChange = (isCheckboxOn) => {
        setCheckboxActive(isCheckboxOn)
    }


    const closeInfoTooltip = () => {
        setInfoTooltipOpen(false)
        setMessage('')
    }


    return (
        <section className='movies'>

            {isSubmitting && <Preloader />}

            <Header
                loggedIn={loggedIn}
            />

            <SearchForm
                handleSubmitSearchForm={handleSubmitSearchForm}
                handleCheckboxChange={handleCheckboxChange}
            />

            {
                infoTooltipOpen ?
                    <InfoTooltip
                        closePopup={closeInfoTooltip}
                        icon={UnionX}
                        notification={message}
                    />
                    :
                    <MoviesCardList
                        moviesList={
                            shortMoviesList.length ?
                                shortMoviesList
                                :
                                moviesList
                        }
                        message={message}
                    />
            }

        </section>
    )
})

export default Movies