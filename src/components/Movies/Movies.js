import { memo, useState, useEffect } from 'react'
import './Movies.css'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'


const Movies = memo(({ loggedIn }) => {
  // const [baseMoviesList, setBaseMoviesList] = useState([])
  const [listForRender, setListForRender] = useState([])
  const [shortListForRender, setShortListForRender] = useState([])
  const [queryString, setQueryString] = useState('')
  const [checkboxActive, setCheckboxActive] = useState(false)
  const [message, setMessage] = useState('')
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)


  // при возврате - для отрисовки прошлого поиска
  useEffect(() => {
    localStorage.listOfFound && setListForRender(JSON.parse(localStorage.getItem('listOfFound')))
  }, [checkboxActive])


  // обработка запроса от формы поиска - в отд. компонент с MoviesSaved - ?
  useEffect(() => {
    if (queryString) {
      const newList = JSON.parse(sessionStorage.getItem('baseMoviesList')).filter((movie) =>
        movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      if (newList.length) {
        setListForRender(newList)
        localStorage.setItem('listOfFound', JSON.stringify(newList)) // в localStorage <= для отрисовки при возврате
      } else {
        setMessage('Ничего не найдено')
      }
    }
  }, [queryString, checkboxActive])


  // обработка чекбокса - после поиска
  useEffect(() => {
    if (checkboxActive && listForRender.length) {
      const newShortList = listForRender.filter(movie => movie.duration <= 40)
      newShortList.length ?
        setShortListForRender(newShortList) : setMessage('Ничего не найдено')
    } else {
      setShortListForRender([])
    }
  }, [checkboxActive, listForRender])


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
    <section className='movies'>
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
              shortListForRender.length ?
                shortListForRender
                :
                listForRender
            }
            message={message}
          />
      }
    </section>
  )
})

export default Movies
