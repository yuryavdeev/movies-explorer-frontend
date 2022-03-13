import {memo, useEffect, useState} from 'react'
import { useLocation } from 'react-router'

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

const MoviesCardList = memo(({ moviesList, message }) => {
  const location = useLocation()
  const [moviesToRender, setMoviesToRender] = useState([])
  const [buttonVisible, setButtonVisible] = useState(true)
  const [numbers, setNumbers] = useState(0)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)


  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    location.pathname === '/movies' &&
      window.addEventListener('resize', () => setTimeout(handleResize, 500))

    return () => window.removeEventListener('resize', handleResize)
  }, [location.pathname])


  useEffect(() => {
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
  }, [location.pathname, moviesList, screenWidth])

  // numbers на первой загрузке и увеличении ширины экрана (зависимость) => отрисовать мин (3, 2, 1) или макс (своё значение)
  useEffect(() => {
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
  }, [location.pathname, numbers, screenWidth])


  useEffect(() => {

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
