import React from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import './App.css'
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUser } from '../../contexts/CurrentUserContext'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../MoviesSaved/MoviesSaved'
import Profile from '../Profile/Profile'
import PageNotFound from '../PageNotFound/PageNotFound'
import Preloader from '../Preloader/Preloader'
import { register, authorize, deleteAuth, getUser, updateUser } from '../../utils/MainApi'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionV from '../../images/union-v.svg'
import UnionX from '../../images/union-x.svg'

function App() {

  const history = useHistory()
  const location = useLocation()
  const [currentUser, setCurrentUser] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState(false)
  const withFooterURL = ['/', '/movies', '/saved-movies']
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [messageErr, setMessageErr] = React.useState('')

  // function isEmpty(obj) {
  //   for (let key in obj) {
  //     // если тело цикла начнет выполняться - значит в объекте есть свойства
  //     return false;
  //   }
  //   return true;
  // }

  // авторизация при входе
  React.useEffect(() => {
    if (localStorage.isAuth) {
      getUser()
        .then((userData) => {
          console.log(userData)
          setLoggedIn(true); // xxxxxxxxxxxxxxxxxxxxxxxx ЗАЧЕМ
          setCurrentUser(userData);
          history.push(location.pathname)
        })
        .catch(err => {
          console.log(err);
          history.push('/signin')
        })
    }
  }, []);


  const openPopupErr = (err) => {
    setInfoTooltipOpen(true)
    setMessageErr(`В ответе на Ваш запрос сервером возвращена ошибка - ${err}`)
  }


  // регистрация пользователя
  const handleRegistrationSubmit = ({ name, email, password }) => {
    setIsSubmitting(true)
    register({ name, email, password })
      .then(() => {
        setInfoTooltipOpen(true)
        setTimeout(() => {
          handleLoginSubmit({ email, password })
          setInfoTooltipOpen(false)
        },
          2000)
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }

  // авторизация пользователя
  const handleLoginSubmit = ({ email, password }) => {
    setIsSubmitting(true)
    authorize({ email, password })
      .then((userData) => {
        setLoggedIn(true)
        setCurrentUser(userData);
        localStorage.setItem('isAuth', true) // маркер - true/false
        history.push('/movies')
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }

  // выйти из аккаунта
  const handleLogout = () => {
    setIsSubmitting(true)
    deleteAuth()
      .then(() => {
        setLoggedIn(false)
        setCurrentUser()
        history.push('/')
        localStorage.removeItem('isAuth')
        // localStorage.removeItem('moviesList') // - или по истечении ВРЕМЕНИ
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }

  // обновить данные пользователя
  const handleSubmitUpdateUser = ({ name, email }) => {
    setIsSubmitting(true)
    updateUser({ name, email })
      .then(userData => {
        setInfoTooltipOpen(true)
        setCurrentUser(userData)
        setTimeout(() => {
          setInfoTooltipOpen(false)
        },
          2000)
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }


  const closePopup = () => {
    setInfoTooltipOpen(false)
    setMessageErr('')
  }


  return (
    <CurrentUser.Provider value={currentUser}>

      {isSubmitting && <Preloader />}

      <div className='app'>

        <Switch>
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
            />
          </Route>

          <ProtectedRoute exact path='/movies'
            component={Movies}
            loggedIn={loggedIn}
          />

          <ProtectedRoute exact path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
          />

          <ProtectedRoute exact path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            handleSubmitUpdateUser={handleSubmitUpdateUser}
          />

          <Route exact path='/signin'>
            <Login
              handleLoginSubmit={handleLoginSubmit}
              messageErr={messageErr}
            />
          </Route>

          <Route exact path='/signup'>
            <Register
              handleRegistrationSubmit={handleRegistrationSubmit}
              messageErr={messageErr}
            />
          </Route>

          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>

        {withFooterURL.includes(location.pathname) && <Footer />}

        {
          infoTooltipOpen &&
          <InfoTooltip
            closePopup={closePopup}
            icon={messageErr ? UnionX : UnionV}
            notification={messageErr ? messageErr : 'Запрос выполнен успешно!'}
          />
        }

      </div>
    </CurrentUser.Provider>
  )
}

export default App
