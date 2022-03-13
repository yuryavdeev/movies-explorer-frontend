import { memo, useState } from 'react'
import './SearchForm.css'
import find from '../../images/find.svg'

const SearchForm = memo(({ handleSubmitSearchForm, handleCheckboxChange }) => {

  const [isCheckboxOn, setIsCheckboxOn] = useState(false)
  const [query, setQuery] = useState('')
  const [inputIsEmpty, setInputIsEmpty] = useState(false)

  const handleInput = (e) => {
    setQuery(e.target.value)
    setInputIsEmpty(false)
  }

  const listenCheckbox = () => {
    handleCheckboxChange(!isCheckboxOn)
    setIsCheckboxOn(!isCheckboxOn)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    !query
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
            placeholder='Movies'
            onChange={handleInput}
            value={query}
            type='text'
          />
        </label>
        {
          inputIsEmpty &&
          <span className='search__input-error'>Keyword required</span>
        }
        <button
          className='search__button'
          type='submit'
          style={{ backgroundImage: `url(${find})` }}
        >
        </button>
        <hr className='search__border-line' />
        <label className='search__label-checkbox'>Short films
          <input
            className='search__checkbox'
            type='checkbox'
            onChange={listenCheckbox}
          />
          <span className='search__checkbox-visible'></span>
        </label>
      </form>

    </section>
  )
})

export default SearchForm