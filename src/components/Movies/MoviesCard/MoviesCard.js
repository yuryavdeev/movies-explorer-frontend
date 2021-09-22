import React from 'react';
import './MoviesCard.css';

const MoviesCard = React.memo(() => {

    const cards = [
        {
            name: '33 слова о дизайне',
            duration: 77,
            saved: true,
        },
        {
            name: 'Киноальманах «100 лет дизайна»',
            duration: 87,
            saved: false,
        },
    ]
    
    return (
        <section className='movies-card'>

        </section>
    )
});

export default MoviesCard;