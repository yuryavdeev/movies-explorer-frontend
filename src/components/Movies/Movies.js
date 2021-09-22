import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Preloader from './Preloader/Preloader'
import MoviesCard from './MoviesCard/MoviesCard';

const Movies = React.memo(() => {
    return (
        <section className='movies'>
            <Header />
            {/* <Preloader /> */}
            <MoviesCard />
        </section>
    )
});

export default Movies;