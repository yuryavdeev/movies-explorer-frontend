import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';

const SavedMovies = React.memo(() => {
    return (
        <section className='saved-movies'>
            <Header />

        </section>
    )
});

export default SavedMovies;