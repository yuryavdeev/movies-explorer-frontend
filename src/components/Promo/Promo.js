import React from 'react'
import './Promo.css'

const Promo = React.memo(() => {
    return (
        <section className='promo'>
            <h1 className='promo__titile'>
                Учебный проект студента факультета Веб-разработки.
            </h1>
        </section>
    )
})

export default Promo