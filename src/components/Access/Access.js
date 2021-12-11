import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useFormWithValidation } from '../Validation/Validation'
import './Access.css'
import logo from '../../images/logo.svg'

const Access = React.memo(({ nextHandleSubmit, greeting, button, isRegistrated, link, messageErr }) => {

  const location = useLocation()
  const history = useHistory()
  const handleForm = useFormWithValidation()
  const [buttonDisabled, setButtonDisabled] = React.useState(true)


  React.useEffect(() => {
    handleForm.isValid ? setButtonDisabled(false) : setButtonDisabled(true)
  }, [handleForm.isValid])


  const handleSubmit = (evt) => {
    evt.preventDefault()
    nextHandleSubmit(handleForm.values)
    handleForm.resetForm()
  }


  return (
    <div className='access'>

      <div className='access__top'>
        <img className='logo' src={logo} onClick={() => history.push('/')} alt='логотип' />
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
                className={`access__input ${handleForm.errors.name && 'access__input_wrong'}`}
                value={handleForm.values.this}
                onChange={handleForm.handleChange}
                // formNoValidate
                minLength='2'
                maxLength='30'
                pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                title="поле может содержать только латиницу, кириллицу, пробел или дефис"
              />
            </label>
            {
              handleForm.errors.name &&
              <span className='access__input-error'>{handleForm.errors.name}</span>
            }
          </>
        }

        <label className='access__label'>E-mail
          <input
            id='email'
            name='email'
            type='email'
            placeholder='e-mail'
            className={`access__input ${handleForm.errors.email && 'access__input_wrong'}`}
            value={handleForm.values.this}
            onChange={handleForm.handleChange}
            // formNoValidate
            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
            title="поле должно содержать формат электронного адреса"
          />
        </label>
        {
          handleForm.errors.email &&
          <span className='access__input-error'>{handleForm.errors.email}</span>
        }

        <label className='access__label'>Пароль
          <input
            id='password'
            name='password'
            type='password'
            placeholder='password'
            className={`access__input ${handleForm.errors.password && 'access__input_wrong'}`}
            value={handleForm.values.this}
            onChange={handleForm.handleChange}
            // formNoValidate
            minLength='6'
            maxLength='30'
            title="поле должно содержать не менее 6 и не более 30 знаков"
          />
        </label>
        {
          handleForm.errors.password &&
          <span className='access__input-error'>{handleForm.errors.password}</span>
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