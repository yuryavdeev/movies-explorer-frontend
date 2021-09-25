import React from 'react';

import './SearchForm.css';
import find from '../../images/find.svg';

const SearchForm = React.memo(({ handleSubmitSearchForm }) => {

    const [checkboxOn, setCheckboxOn] = React.useState(false)
    const [query, setQuery] = React.useState('');

    const handleInput = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSubmitSearchForm(query)
        setQuery('')
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
                        type="text"
                        required />
                </label>
                <button
                    className="search__button"
                    type="submit"
                    style={{ backgroundImage: `url(${find})` }}
                >
                </button>
                <label className='search__label-checkbox'>Короткометражки
                    <input
                        className='search__checkbox'
                        type="checkbox"
                        onClick={() => setCheckboxOn(!checkboxOn)}
                    />
                    <span className='search__checkbox-visible'></span>
                </label>
            </form>

        </section>
    )
});

export default SearchForm;