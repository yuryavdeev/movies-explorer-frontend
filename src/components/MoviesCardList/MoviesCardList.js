import React from 'react'
import { useLocation } from 'react-router'

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

const MoviesCardList = React.memo(({ moviesList, message }) => {

    const location = useLocation()
    const [moviesToRender, setMoviesToRender] = React.useState([])
    const [buttonVisible, setButtonVisible] = React.useState(true)
    const [numbers, setNumbers] = React.useState(0)
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)


    React.useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        location.pathname === '/movies' &&
            window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [location.pathname])


    React.useEffect(() => {
        setButtonVisible(true)

        location.pathname === '/saved-movies'
            ?
            setNumbers(moviesList.length)
            :
            setNumbers(
                (screenWidth >= 1137) ?
                    3
                    :
                    (screenWidth < 768) ?
                        1
                        :
                        2
            )
    }, [moviesList])

    // numbers на первой загрузке и увеличении ширины экрана (! - слушатель) => отрисовать мин (3, 2, 1) или макс (своё значение)
    React.useEffect(() => {
        location.pathname === '/movies'
            &&
            setNumbers(
                screenWidth >= 1137 ?
                    Math.max(3, numbers)
                    :
                    screenWidth < 768 ?
                        numbers
                        :
                        Math.max(2, numbers)
            )
    }, [screenWidth])


    React.useEffect(() => {

        setMoviesToRender(
            moviesList.slice(0, numbers).map(movie =>
                <MoviesCard
                    key={movie.id}
                    incomingMovie={movie}
                />
            )
        )
        moviesList.length <= numbers && setButtonVisible(false)

    }, [moviesList, numbers])


    const addMoviesToScreen = () => {
        setNumbers(
            screenWidth >= 1137 ?
                numbers + 3
                // : screenWidth < 768 ?
                //     numbers + 1
                :
                numbers + 2
        )
    }


    return (
        <section className='movies-card-list'>
            {
                message ?
                    <p className="movies-card-list__message">{message}</p>
                    :
                    <div className='movies-card-list__grid'>
                        {moviesToRender}
                    </div>
            }
            {
                buttonVisible &&
                !message &&
                <button className='movies-card-list__button' onClick={addMoviesToScreen}>Ещё</button>
            }
        </section>
    )
})

export default MoviesCardList