import React from 'react';
import { useLocation } from 'react-router';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = React.memo(({ moviesList }) => {

    const location = useLocation()

    const addMoviesToScreen = () => {
        console.log("Плюс 4 строки")
    }

    const movies = moviesList.slice(0, 6).map(movie => {
        // movie.visible = false
        return <MoviesCard
            key={movie._id}  // React
            movie={movie}
        />
    })

    return (
        <section className='movies-card-list'>
            <div className='movies-card-list__grid'>
                {movies}
            </div>
            {
                location.pathname === '/movies' &&
                <button className='movies-card-list__button' onClick={addMoviesToScreen}>Ещё</button>
            }
        </section>
    )
});

export default MoviesCardList;