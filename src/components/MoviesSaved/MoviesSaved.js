import React from 'react'

import './MoviesSaved.css'
import Header from '../Header/Header'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { getMyMovies } from '../../utils/api'


const SavedMovies = React.memo(({ moviesList }) => {

    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [myMovies, setMyMovies] = React.useState(moviesList)
    // const [myMoviesList, setMyMoviesList] = React.useState(myMoviesTest)

    React.useEffect(() => {
        setIsSubmitting(true)
        getMyMovies()
            // .then((moviesArray) => {
            //     // setMyMovies(moviesArray)
            // })
            .catch(err => console.log(err))
            .finally(() => setIsSubmitting(false))
    }, [])


    const handleSubmitSearchForm = (queryString) => {
        // myMovies.filter... // <<<<<<<<<<<<<<<<<<<<<<<<=========================

        // setIsSubmitting(true)
        // findInMyMovies(queryString)
        //     .then((moviesArray) => {
        //         // setMyMoviesList(moviesArray)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         setInfoTooltipOpen(true)
        //         setIsAuthSuccess(false)
        //     })
        //     .finally(() => setIsSubmitting(false))
    }

    return (
        <section className='movies-saved'>
            {isSubmitting && <Preloader />}
            <Header />
            <SearchForm
                handleSubmitSearchForm={handleSubmitSearchForm}
            />
            {
                myMovies &&
                <MoviesCardList
                    moviesList={myMovies}
                />
            }

        </section>
    )
})

export default SavedMovies