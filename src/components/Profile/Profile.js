import React from 'react'
import './Profile.css'
import Header from '../Header/Header'
import { CurrentUser } from '../../contexts/CurrentUserContext'


const Profile = React.memo(({ loggedIn, handleSubmitUpdateUser, handleLogout }) => {

    const currentUser = React.useContext(CurrentUser)
    const [buttonDisabled, setButtonDisabled] = React.useState(true) // при загрузке исправить на true
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [wrongName, setWrongName] = React.useState(false)
    const [wrongEmail, setWrongEmail] = React.useState(false) // ошибка результата запроса


    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name)
            setEmail(currentUser.email)
        }
    }, [currentUser])


    React.useEffect(() => {
        if (currentUser) {
            wrongName || wrongEmail || (name === currentUser.name && email === currentUser.email)
                ?
                setButtonDisabled(true)
                :
                setButtonDisabled(false)
        }
    }, [wrongName, wrongEmail, email, name, currentUser])

    const handleClick = (evt) => {
        evt.preventDefault()
        handleSubmitUpdateUser({ name, email })
    }

    const handleNameInput = (evt) => {
        setName(evt.target.value)
        evt.target.validationMessage ?
            setWrongName(evt.target.validationMessage)
            :
            setWrongName('')
    }

    const handleEmailInput = (evt) => {
        setEmail(evt.target.value)
        evt.target.validationMessage ?
            setWrongEmail(evt.target.validationMessage)
            :
            setWrongEmail('')
    }

    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <section className='profile'>
                <h2 className='profile__title'>Привет, {currentUser && currentUser.name}!</h2>

                <form className='profile__form' onSubmit={handleClick} id='updateUser'>
                    <label className='profile__label'>Имя
                        <input
                            id='name'
                            name='name'
                            type='text'
                            className={`profile__input ${wrongName && 'profile__input_wrong'}`}
                            value={name}
                            onChange={handleNameInput}
                            formNoValidate
                            minLength='2'
                            maxLength='30'
                            pattern='^[A-Za-zА-Яа-яЁё\s\-]*$'
                            title="поле может содержать только латиницу, кириллицу, пробел или дефис"
                        />
                    </label>

                    <label className='profile__label'>E-mail
                        <input
                            id='email'
                            name='email'
                            type='email'
                            className={`profile__input ${wrongEmail && 'profile__input_wrong'}`}
                            value={email}
                            onChange={handleEmailInput}
                            formNoValidate
                            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                            title="поле может содержать только электронный адрес"
                        />
                    </label>

                </form>
                <>
                    {
                        wrongName &&
                        <span className='profile__input-error name-error'>{wrongName}</span>
                    }
                    {
                        wrongEmail &&
                        <span className='profile__input-error email-error'>{wrongEmail}</span>
                    }
                </>

                <div className='profile__bottom'>
                    <button
                        className={`profile__submit ${buttonDisabled && 'profile__submit_disabled'}`}
                        form='updateUser'
                        disabled={buttonDisabled}
                        type='submit'>Редактировать
                    </button>
                    <button
                        className='profile__submit profile__submit_color'
                        onClick={handleLogout}
                        type='button'>Выйти из аккаунта
                    </button>
                </div>
            </section>
        </>
    )
})

export default Profile