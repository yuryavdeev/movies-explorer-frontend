import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUser } from '../../contexts/CurrentUserContext';


const Profile = React.memo(({ handleSubmitUpdateUser, handleLogout }) => {

    const currentUser = React.useContext(CurrentUser);
    const [buttonDisabled, setButtonDisabled] = React.useState(false) // при загрузке исправить на true
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [somethingWrongName, setSomethingWrongName] = React.useState(false);
    const [somethingWrongEmail, setSomethingWrongEmail] = React.useState(false); // ошибка результата запроса

    React.useEffect(() => {
        currentUser &&
            setName(currentUser.name)
            setEmail(currentUser.email)
    }, [currentUser]);

    const handleClick = (evt) => {
        evt.preventDefault();
        handleSubmitUpdateUser({ name, email });
    }

    const handleNameInput = (evt) => {
        setName(evt.target.value);
    }

    const handleEmailInput = (evt) => {
        setEmail(evt.target.value);
    }


    return (
        <>
            <Header />
            <section className='profile'>
                <h2 className='profile__title'>Привет, {name}!</h2>

                <form className='profile__form' onSubmit={handleClick} id='updateUser'>
                    <label className='profile__label'>Имя
                        <input
                            id='name'
                            name='name'
                            type='text'
                            className={`profile__input ${somethingWrongName && 'profile__input_wrong'}`}
                            value={name}
                            onChange={handleNameInput}
                            required
                        // formNoValidate
                        />
                    </label>

                    <label className='profile__label'>E-mail
                        <input
                            id='email'
                            name='email'
                            type='email'
                            className={`profile__input ${somethingWrongEmail && 'profile__input_wrong'}`} // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                            value={email}
                            onChange={handleEmailInput}
                            required
                        />
                    </label>

                </form>
                <>
                    {
                        somethingWrongName &&
                        <span className='profile__input-error name-error'>Поле 'Имя' невалидно!</span>
                    }
                    {
                        somethingWrongEmail &&
                        <span className='profile__input-error email-error'>Поле 'E-mail' невалидно!</span>
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
    );
});

export default Profile;