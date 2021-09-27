import React from 'react'

import './Movies.css'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'


const Movies = React.memo(({ moviesList, handleSubmitSearchForm }) => {

    return (
        <section className='movies'>
            <Header />
            <SearchForm
                handleSubmitSearchForm={handleSubmitSearchForm}
            />
            {
                moviesList &&
                <MoviesCardList
                    moviesList={moviesList}
                />
            }
        </section>
    )
})

export default Movies