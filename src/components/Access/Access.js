import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import './Access.css'
import logo from '../../images/logo.svg';

const Access = React.memo(({ nextHandleSubmit, greeting, button, isRegistrated, link }) => {

    const location = useLocation();

    const [mistake, setMistake] = React.useState('Что-то пошло не так...');
    const [somethingWrongName, setSomethingWrongName] = React.useState(false);
    const [somethingWrongEmail, setSomethingWrongEmail] = React.useState(false); // ошибка результата запроса
    const [somethingWrongPassword, setSomethingWrongPassword] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false) // при загрузке исправить на true

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        nextHandleSubmit({ name, email, password });
    }

    const handleNameInput = (evt) => {
        setName(evt.target.value);
    }

    const handleEmailInput = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordInput = (evt) => {
        setPassword(evt.target.value);
    }

    return (
        <div className='access'>

            <div className='access__top'>
                <img className='logo' src={logo} alt='логотип' />
                <h2 className='access__title'>{greeting}</h2>
            </div>

            <form className='access__form' onSubmit={handleSubmit} id='access'>
                {location.pathname === '/signup' &&
                    <>
                        <label className='access__label'>Имя
                            <input
                                id='name'
                                name='name'
                                type='text'
                                className={`access__input ${somethingWrongName && 'access__input_wrong'}`}
                                value={name}
                                onChange={handleNameInput}
                                required
                                // formNoValidate
                                minLength='6'
                                maxLength='30'
                                placeholder = 'name'
                            />
                        </label>
                        {
                            somethingWrongName &&
                            <span className='access__input-error name-error'>{mistake}</span>
                        }
                    </>
                }

                <label className='access__label'>E-mail
                    <input
                        id='email'
                        name='email'
                        type='email'
                        className={`access__input ${somethingWrongEmail && 'access__input_wrong'}`} // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                        value={email}
                        onChange={handleEmailInput}
                        required
                        placeholder='e-mail'
                    />
                </label>
                {
                    somethingWrongEmail &&
                    <span className='access__input-error email-error'>{mistake}</span>
                }

                <label className='access__label'>Пароль
                    <input
                        id='password'
                        name='password'
                        type='password'
                        className={`access__input ${somethingWrongPassword && 'access__input_wrong'}`}
                        value={password}
                        onChange={handlePasswordInput}
                        required
                        minLength='6'
                        maxLength='30'
                        placeholder='password'
                    />
                </label>
                {
                    somethingWrongPassword &&
                    <span className='access__input-error password-error'>{mistake}</span>
                }
            </form>

            <div className='access__bottom'>
                <button
                    className={`access__submit ${buttonDisabled && 'access__submit_disabled'}`}
                    form='access'
                    disabled={buttonDisabled}
                    type='submit'
                >
                    {button}
                </button>
                <p className='access__is-registrated'>{isRegistrated}
                    <Link
                        to={location.pathname === '/signin' ? '/signup' : '/signin'}
                        className='access__link'
                        target='_self'
                    >
                        {link}
                    </Link>
                </p>
            </div>
        </div>
    );
});

export default Access;