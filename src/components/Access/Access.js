import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './Access.css'
import logo from '../../images/logo.svg'
// import { useForm } from '../Validation'

const Access = React.memo(({ nextHandleSubmit, greeting, button, isRegistrated, link, messageErr }) => {

    const location = useLocation()
    // const form = useForm()
    const [wrongName, setWrongName] = React.useState('')
    const [wrongEmail, setWrongEmail] = React.useState('')
    const [wrongPassword, setWrongPassword] = React.useState('')
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    //   const [errors, setErrors] = React.useState({})
    //   const [values, setValues] = React.useState({});
    //   const [isValid, setIsValid] = React.useState(false);

    //   const handleChange = (evt) => {
    //     const target = evt.target;
    //     const name = target.name;
    //     const value = target.value;
    //     setValues({...values, [name]: value});
    //     //validationMessage возвр. span c сообщ. об ошибке проверки для текущего поля формы
    //     setErrors({...errors, [name]: target.validationMessage });
    //     // checkValidity возвр. true, если значение элемента проходит валидацию, иначе - false
    //     setIsValid(target.closest("form").checkValidity());
    //   }


    React.useEffect(() => {
        if (location.pathname === '/signin') {
            !email || !password
                ?
                setButtonDisabled(true)
                :
                wrongEmail || wrongPassword
                    ?
                    setButtonDisabled(true)
                    :
                    setButtonDisabled(false)
        } else {
            !name || !email || !password
                ?
                setButtonDisabled(true)
                :
                wrongName || wrongEmail || wrongPassword
                    ?
                    setButtonDisabled(true)
                    :
                    setButtonDisabled(false)
        }
    }, [wrongName, wrongEmail, wrongPassword, location.pathname, email, password, name])


    const handleSubmit = (evt) => {
        evt.preventDefault()
        nextHandleSubmit({ name, email, password })
    }


    const handleNameInput = (evt) => {
        setName(evt.target.value)
        // handleChange(evt)
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


    const handlePasswordInput = (evt) => {
        setPassword(evt.target.value)
        evt.target.validationMessage ?
            setWrongPassword(evt.target.validationMessage)
            :
            setWrongPassword('')
    }



    // console.log(form.values)



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
                                placeholder='name'
                                className={`access__input ${wrongName && 'access__input_wrong'}`}
                                value={name}
                                onChange={handleNameInput}
                                formNoValidate
                                minLength='2'
                                maxLength='30'
                                pattern='^[A-Za-zА-Яа-яЁё\s\-]*$'
                                title="поле может содержать только латиницу, кириллицу, пробел или дефис"
                            />
                        </label>
                        {
                            wrongName &&
                            <span className='access__input-error name-error'>{wrongName}</span>
                        }
                    </>
                }

                <label className='access__label'>E-mail
                    <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='e-mail'
                        className={`access__input ${wrongEmail && 'access__input_wrong'}`}
                        value={email}
                        onChange={handleEmailInput}
                        formNoValidate
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                        title="поле должно содержать формат электронного адреса"
                    />
                </label>
                {
                    wrongEmail &&
                    <span className='access__input-error email-error'>{wrongEmail}</span>
                }

                <label className='access__label'>Пароль
                    <input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='password'
                        className={`access__input ${wrongPassword && 'access__input_wrong'}`}
                        value={password}
                        onChange={handlePasswordInput}
                        formNoValidate
                        minLength='6'
                        maxLength='30'
                    />
                </label>
                {
                    wrongPassword &&
                    <span className='access__input-error password-error'>{wrongPassword}</span>
                }
            </form>

            <div className='access__bottom'>
                {messageErr &&
                    <p className="access__message">{messageErr}</p>}

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
    )
})

export default Access