import {memo, useEffect, useState} from 'react'

import './MoviesSaved.css'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'


const SavedMovies = memo(({ loggedIn }) => {
  const [myFavoriteMoviesList, setMyFavoriteMoviesList] = useState([])
  const [favoriteListForRender, setFavoriteListForRender] = useState([])
  const [shortFavoriteListForRender, setShortFavoriteListForRender] = useState([])
  const [checkboxActive, setCheckboxActive] = useState(false)
  const [message, setMessage] = useState('')
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [queryString, setQueryString] = useState('')


  // при удалении из изб. и смене чекбокса - обновить
  useEffect(() => {
    localStorage.myFavoriteMoviesList && setMyFavoriteMoviesList(JSON.parse(localStorage.getItem('myFavoriteMoviesList')))
  }, [checkboxActive])


  // обработка запроса от формы поиска 
  useEffect(() => {
    if (queryString) {
      const newList = myFavoriteMoviesList.filter((movie) =>
        movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      newList.length ?
        setFavoriteListForRender(newList) : setMessage('Ничего не найдено')
    } else {
      setFavoriteListForRender(myFavoriteMoviesList)
    }
  }, [queryString, checkboxActive, myFavoriteMoviesList])


  // обработка чекбокса
  useEffect(() => {
    if (checkboxActive && favoriteListForRender.length) {
      const newShortList = favoriteListForRender.filter(movie => movie.duration <= 40)
      newShortList.length ?
        setShortFavoriteListForRender(newShortList) : setMessage('Ничего не найдено')
    } else {
      setShortFavoriteListForRender([])
    }
  }, [checkboxActive, favoriteListForRender])


  const handleSubmitSearchForm = (query) => {
    setMessage('')
    setQueryString(query)
  }


  const handleCheckboxChange = (isCheckboxOn) => {
    setMessage('')
    setCheckboxActive(isCheckboxOn)
  }


  const closeInfoTooltip = () => {
    setInfoTooltipOpen(false)
    setMessage('')
  }


  return (
    <section className='movies-saved'>

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
          <MoviesCardList
            moviesList={
              shortFavoriteListForRender.length ?
                shortFavoriteListForRender
                :
                favoriteListForRender.length ?
                  favoriteListForRender
                  :
                  myFavoriteMoviesList
            }
            message={message}
          />
      }

    </section>
  )
})

export default SavedMovies
