import React from 'react'

import './MoviesSaved.css'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { getMyMovies } from '../../utils/MainApi'
import Preloader from '../Preloader/Preloader'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'


const SavedMovies = React.memo(({ loggedIn }) => {

    const [initialMyMoviesList, setInitialMyMoviesList] = React.useState([]) // из апи
    const [myMoviesList, setMyMoviesList] = React.useState([])
    const [checkboxActive, setCheckboxActive] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
    const [queryString, setQueryString] = React.useState('')
    const [mark, setMark] = React.useState(false)
    const [shortMoviesList, setShortMoviesList] = React.useState([])
    const [startSearch, setStartSearch] = React.useState(false)

    // console.log(JSON.parse(localStorage.getItem('moviesSavedList'))) // <<<<<<<<<<<<<<<<<<<<<<<
    // console.log(JSON.parse(localStorage.getItem('moviesList'))) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // console.log(shortMoviesList)

    React.useEffect(() => {
        console.log('ПЕРЕГРУЗ')
        setIsSubmitting(true)
        getMyMovies()
            .then((moviesArray) => {
                setInitialMyMoviesList(moviesArray)
                setMyMoviesList(moviesArray)
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }, [mark])


    // обработка запроса от формы поиска 
    React.useEffect(() => {
        console.log(`${queryString}`)
        if (queryString) {
            const newList =
                myMoviesList.filter((movie) =>
                    movie && movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                )
            console.log(newList)
            if (newList.length !== 0) {
                setMyMoviesList(newList)  // найденные фильмы в стейт
                setMessage('')
            } else {
                setMessage('Ничего не найдено')
            }
        }
        else {
            setMessage('')
        }
        setIsSubmitting(false)
    }, [startSearch, checkboxActive])



    // обработка чекбокса
    React.useEffect(() => {
        console.log('checkboxActive')
        if (checkboxActive && myMoviesList.length) {
            const newShortList =
                myMoviesList.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortMoviesList(newShortList)
                :
                setMessage('Ничего не найдено')
        } else {
            setShortMoviesList([])
        }
    }, [checkboxActive, myMoviesList])


    const handleSubmitSearchForm = (query) => {
        setMyMoviesList(initialMyMoviesList)
        setQueryString(query)
        setStartSearch(!startSearch)
    }

    const handleClickDeleteMovie = () => {
        setMark(!mark)
    }

    const handleCheckboxChange = (isCheckboxOn) => {
        setCheckboxActive(isCheckboxOn)
    }

    const closeInfoTooltip = () => {
        setInfoTooltipOpen(false)
        setMessage('')
    }


    return (
        <section className='movies-saved'>

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
                    myMoviesList &&
                    <MoviesCardList
                        moviesList={
                            shortMoviesList.length ?
                                shortMoviesList
                                :
                                myMoviesList
                        }
                        handleClickDeleteMovie={handleClickDeleteMovie}
                        message={message}
                    />
            }

        </section>
    )
})

export default SavedMovies