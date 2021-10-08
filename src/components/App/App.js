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
import { register, authorize, deleteAuth, getUser, updateUser, getMyMovies } from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionV from '../../images/union-v.svg'
import UnionX from '../../images/union-x.svg'

function App() {

  const history = useHistory()
  const location = useLocation()
  const [currentUser, setCurrentUser] = React.useState()
  const withFooterURL = ['/', '/movies', '/saved-movies']
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [messageErr, setMessageErr] = React.useState('')


  // авторизация при возврате на сайт
  React.useEffect(() => {
    if (localStorage.isAuth) {
      // console.log('isAuth ? => getUser...')
      setIsSubmitting(true)
      getUser()
        .then((userData) => {
          setCurrentUser(userData)
          updateMoviesLists()
          history.push(location.pathname) // => при непоср. переходе или обновл. - если ProtectedRoute > /signin <= location.pathname
        })
        .catch(err => {
          console.log(err);
          history.push('/signin')
        })
        .finally(() => setIsSubmitting(false))
    }
  }, []);


  // авторизация пользователя на /signin
  const handleLoginSubmit = ({ email, password }) => {
    setIsSubmitting(true)
    authorize({ email, password })
      .then((userData) => {
        localStorage.setItem('isAuth', true) // маркер для useEffect
        setCurrentUser(userData)
        updateMoviesLists()
        history.push('/movies')
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }


  // регистрация пользователя
  const handleRegistrationSubmit = ({ name, email, password }) => {
    setIsSubmitting(true)
    register({ name, email, password })
      .then(() => {
        setInfoTooltipOpen(true)
        setTimeout(() => {
          handleLoginSubmit({ email, password }) // => получить куки
          setInfoTooltipOpen(false)
        },
          2000)
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }


  // выйти из аккаунта
  const handleLogout = () => {
    setIsSubmitting(true)
    deleteAuth()
      .then(() => {
        localStorage.clear();
        setCurrentUser()
        history.push('/')
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


  // логику ниже и логику добавить-удалить из MoviesCard в отд. компонент... сюда - деструкт-ей
  const updateMoviesLists = () => {
    // console.log('updateMoviesLists')
    setIsSubmitting(true)

    getMyMovies()
      .then((myMoviesArray) => {
        localStorage.setItem('myFavoriteMoviesList', JSON.stringify(myMoviesArray))

        if (!localStorage.mainMoviesArray) { // запустится при логине, а не при обновлении стр.
          moviesApi.getMovies()
            .then((mainMoviesArray) => {

              if (myMoviesArray.length) { // если есть фильмы в избранном от API - обнов. осн. список фильмов
                const temporaryList = mainMoviesArray
                myMoviesArray.map((savedMovie) => {
                  const movieIndex = temporaryList.findIndex(existedMovie => existedMovie.id === savedMovie.id) // => index
                  movieIndex > -1 &&
                    temporaryList.splice(movieIndex, 1, savedMovie) // с movieIndex удалить 1 эл-т и заменить его на savedMovie
                  return temporaryList
                })
                localStorage.setItem('moviesList', JSON.stringify(temporaryList)) // обновл. массив в localStorage <= в /movies отрисовка с уч. избранного
              } else {
                localStorage.setItem('moviesList', JSON.stringify(mainMoviesArray)) // полученный без изм. массив в localStorage
              }
            })

            .catch(() => {
              setMessageErr('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
              setInfoTooltipOpen(true)
            })
        }
      })
      .catch((err) => openPopupErr(err))
      .finally(() => setIsSubmitting(false))
  }


  const openPopupErr = (err) => {
    setMessageErr(`В ответе на Ваш запрос сервером возвращена ошибка - ${err}`)
    setInfoTooltipOpen(true)
  }


  const closePopup = () => {
    setInfoTooltipOpen(false)
    setMessageErr('')
  }


  return (
    <CurrentUser.Provider value={currentUser}>

      <div className='app'>

        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute exact path='/movies'
            component={Movies}
          />

          <ProtectedRoute exact path='/saved-movies'
            component={SavedMovies}
          />

          <ProtectedRoute exact path='/profile'
            component={Profile}
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

        {isSubmitting && <Preloader />}

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
