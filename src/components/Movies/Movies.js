import React from 'react'

import './Movies.css'
import Header from '../Header/Header'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionX from '../../images/union-x.svg'


const Movies = React.memo(({ loggedIn }) => {

    const [mainMoviesList, setMainMoviesList] = React.useState([])
    const [listForRender, setListForRender] = React.useState([])
    const [shortListForRender, setShortListForRender] = React.useState([])
    const [queryString, setQueryString] = React.useState('')
    const [checkboxActive, setCheckboxActive] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)


    React.useEffect(() => {
        setMainMoviesList(JSON.parse(localStorage.getItem('moviesList')))
    }, [checkboxActive]) // при удалении и сохр. фильмов в избранном и смене чекбокса - обновить осн. список


    // обработка запроса от формы поиска - попробовать в отд. компонент с MoviesSaved
    React.useEffect(() => {
        if (queryString) {
            const newList = mainMoviesList.filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            newList.length ?
                setListForRender(newList) : setMessage('Ничего не найдено')
        }
    }, [queryString, checkboxActive, mainMoviesList])


    // обработка чекбокса - после поиска
    React.useEffect(() => {
        if (checkboxActive && listForRender.length) {
            const newShortList = listForRender.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortListForRender(newShortList) : setMessage('Ничего не найдено')
        } else {
            setShortListForRender([])
        }
    }, [checkboxActive, listForRender])


    // запрос - ч/з арi или из localstorage
    const handleSubmitSearchForm = (query) => {
        setMessage('')
        setQueryString(query)
    }


    const handleCheckboxChange = (isCheckboxOn) => {
        console.log(isCheckboxOn)
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