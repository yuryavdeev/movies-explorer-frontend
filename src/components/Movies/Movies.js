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
    // const [foundMoviesList, setFoundMoviesList] = React.useState([])
    const [shortMoviesList, setShortMoviesList] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [startSearch, setStartSearch] = React.useState(false)


    // изм списка всех фильмов
    React.useEffect(() => {
        localStorage.moviesList &&
            setInitialMoviesList(JSON.parse(localStorage.getItem('moviesList')))
        console.log(moviesList)
        console.log('Movie - переписал основной список')
    }, []);


    // обработка запроса от формы поиска 
    React.useEffect(() => {
        if (queryString) {
            // console.log(moviesList)
            // console.log(queryString)
            const newList = moviesList.filter((movie) =>
                movie && movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1
            )
            if (newList.length) {
                setMoviesList(newList)  // найденные фильмы в стейт
                setMessage('')
            } else {
                setMessage('Ничего не найдено')
            }
        } else {
            setMessage('')
        }
        setIsSubmitting(false)

    }, [startSearch, checkboxActive])


    // обработка чекбокса
    React.useEffect(() => {
        if (checkboxActive && moviesList.length) {
            const newShortList = moviesList.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortMoviesList(newShortList)
                :
                setMessage('Ничего не найдено')
        } else {
            setShortMoviesList([])
        }
    }, [checkboxActive, moviesList])



    const updateLocalLists = (moviesFromAPI, query) => { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        console.log('updateLocalLists')
        setIsSubmitting(true)
        getMyMovies()
            .then((moviesArray) => {
                setMyMoviesList(moviesArray)
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))

        console.log(myMoviesList)

        if (myMoviesList.length) {
            const unionList = moviesFromAPI
            myMoviesList.map((savedMovie) => {
                const updatedMovieIndex = moviesFromAPI.findIndex(existedMovie => existedMovie.id === savedMovie.id) // => index
                updatedMovieIndex > -1 &&
                    // начиная с updatedMovieIndex удалить 1 элемент и заменить его savedMovie в list
                    unionList.splice(updatedMovieIndex, 1, savedMovie);
                return unionList
            })
            console.log('unionList')
            console.log(unionList)
            localStorage.setItem('moviesList', JSON.stringify(unionList)) // обновленный массив в стейт
            setInitialMoviesList(unionList) // обновленный массив в стейт
        } else {
            localStorage.setItem('moviesList', JSON.stringify(moviesFromAPI)) // массив от API без изменений в стейт
            setInitialMoviesList(moviesFromAPI) // обновленный массив в стейт
        }
        setQueryString(query) // запрос в стейт
        setStartSearch(!startSearch)
    }


    // запрос - ч/з арi или из localstorage
    const handleSubmitSearchForm = (query) => {
        query !== queryString && setIsSubmitting(true)
        setMoviesList(initialMoviesList)
        if (initialMoviesList.length) { // список из localStorage при монтировании
            setQueryString(query) // запрос в стейт
            setStartSearch(!startSearch)
        } else {
            moviesApi.getMovies()
                .then((moviesFromAPI) => {
                    updateLocalLists(moviesFromAPI, query)
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

    console.log(moviesList)

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