import React from 'react'
import { useLocation } from 'react-router'

import './SearchForm.css'
import find from '../../images/find.svg'

const SearchForm = React.memo(({ handleSubmitSearchForm, handleCheckboxChange }) => {

    const location = useLocation()
    const [isCheckboxOn, setIsCheckboxOn] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const [inputIsEmpty, setInputIsEmpty] = React.useState(false)

    const handleInput = (e) => {
        setQuery(e.target.value)
        setInputIsEmpty(false)
    }

    React.useEffect(() => {
        handleCheckboxChange(isCheckboxOn)
    }, [isCheckboxOn])

    const handleSubmit = (e) => {
        e.preventDefault()
        !query && location.pathname !== '/saved-movies'
            ?
            setInputIsEmpty(true)
            :
            handleSubmitSearchForm(query)
    }

    return (
        <section className='search-container'>

            <form className='search__form' onSubmit={handleSubmit}>
                <label className='search__label-input'>
                    <input
                        className='search__input'
                        placeholder='Фильмы'
                        onChange={handleInput}
                        value={query}
                        type='text'
                    />
                </label>
                {
                    inputIsEmpty &&
                    <span className='search__input-error'>Нужно ввести ключевое слово</span>
                }
                <button
                    className='search__button'
                    type='submit'
                    style={{ backgroundImage: `url(${find})` }}
                >
                </button>
                <hr className='search__border-line' />
                <label className='search__label-checkbox'>Короткометражки
                    <input
                        className='search__checkbox'
                        type='checkbox'
                        onChange={() => setIsCheckboxOn(!isCheckboxOn)}
                    />
                    <span className='search__checkbox-visible'></span>
                </label>
            </form>

        </section>
    )
})

export default SearchForm