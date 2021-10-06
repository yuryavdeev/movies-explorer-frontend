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
    const [shortMoviesList, setShortMoviesList] = React.useState([])
    const [startSearch, setStartSearch] = React.useState(false)


    // при монтировании - в осн. стейт фильмы от API
    React.useEffect(() => {
        setIsSubmitting(true)
        getMyMovies()
            .then((moviesArray) => {
                setInitialMyMoviesList(moviesArray)
            })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }, [])


    // обработка запроса от формы поиска 
    React.useEffect(() => {
        if (queryString) {
            const newList =
                initialMyMoviesList.filter((movie) =>
                    movie && movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                )
            if (newList.length) {
                setMyMoviesList(newList)  // найденные фильмы в стейт
                setMessage('')
            } else {
                setMessage('Ничего не найдено')
            }
        }
        else {
            setMyMoviesList(initialMyMoviesList)
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
        setQueryString(query)
        setStartSearch(!startSearch)
    }


    // для перерисовки ( - теперь - через сеттер - setMovie('') в MoviesCard)
    // const updateMyLocalMoviesList = (savedMovie) => {
    //     // начиная с () удалить 1 элемент и заменить его в mainMoviesList
    //     setMyMoviesList(myMoviesList.splice(myMoviesList.findIndex(existedMovie => existedMovie.id === savedMovie.id)), 1, savedMovie)
    // }


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
                                myMoviesList.length ?
                                    myMoviesList
                                    :
                                    initialMyMoviesList
                        }
                        message={message}
                    />
            }

        </section>
    )
})

export default SavedMovies