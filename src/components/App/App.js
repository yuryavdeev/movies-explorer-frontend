import { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import './App.css'
import ProtectedRoute from '../ProtectedRoute'
import ProtectedRouteAuth from '../ProtectedRouteAuth'
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
import moviesApi from '../../utils/MoviesApi'
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import UnionV from '../../images/union-v.svg'
import UnionX from '../../images/union-x.svg'

function App() {
  const history = useHistory()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState()
  const withFooterURL = ['/', '/movies', '/saved-movies']
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [messageErr, setMessageErr] = useState('')
  const [err, setErr] = useState('')


  // авторизация при возврате на сайт
  useEffect(() => {
    if (localStorage.isAuth) {
      if (localStorage.currentUser && localStorage.myFavoriteMoviesList && sessionStorage.baseMoviesList) {
        // console.log(' => local data is true...')
        // console.log(JSON.parse(localStorage.getItem('myFavoriteMoviesList')))
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
        history.push(location.pathname) // => при непоср. переходе или обновл. - если ProtectedRoute > /signin и '/' <= location.pathname
      } else {
        console.log(' => getUser...')
        setIsSubmitting(true)
        getUser()
          .then((userData) => {
            setCurrentUser(userData)
            localStorage.setItem('currentUser', JSON.stringify(userData))
            updateMoviesLists()
            history.push(location.pathname) // => при непоср. переходе или обновл. - если ProtectedRoute > /signin <= location.pathname
          })
          .catch(err => {
            setErr(err)
            history.push('/signin')
          })
          .finally(() => setIsSubmitting(false))
      }
    }
  }, [])


  // обработка ошибок запросов
  useEffect(() => {
    if (err) {
      setMessageErr(`The server returned an error in response to your request - ${err}`)
      setInfoTooltipOpen(true)
    }
  }, [err])


  // авторизация пользователя на /signin
  const handleLoginSubmit = ({ email, password }) => {
    setIsSubmitting(true)
    authorize({ email, password })
      .then((userData) => {
        localStorage.setItem('isAuth', true) // маркер для useEffect
        setCurrentUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
        updateMoviesLists()
        history.push('/movies')
      })
      .catch((err) => setErr(err))
      .finally(() => setIsSubmitting(false))
  }


  // регистрация пользователя
  const handleRegistrationSubmit = ({ name, email, password }) => {
    setIsSubmitting(true)
    register({ name, email, password })
      .then((userData) => {
        console.log(userData)
        setInfoTooltipOpen(true)
        setTimeout(() => {
          handleLoginSubmit({ email, password }) // => получить куки
          setInfoTooltipOpen(false)
        },
          2000)
      })
      .catch((err) => setErr(err))
      .finally(() => setIsSubmitting(false))
    // console.log(localStorage)
    // console.log(currentUser)
  }


  // выйти из аккаунта
  const handleLogout = () => {
    setIsSubmitting(true)
    deleteAuth()
      .then(() => {
        setCurrentUser()
        localStorage.clear()
        sessionStorage.clear()
        history.push('/')
      })
      .catch((err) => setErr(err))
      .finally(() => setIsSubmitting(false))
  }


  // обновить данные пользователя
  const handleSubmitUpdateUser = ({ name, email }) => {
    setIsSubmitting(true)
    updateUser({ name, email })
      .then(userData => {
        setInfoTooltipOpen(true)
        setCurrentUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
        setTimeout(() => {
          setInfoTooltipOpen(false)
        },
          2000)
      })
      .catch((err) => setErr(err))
      .finally(() => setIsSubmitting(false))
  }


  const updateMoviesLists = () => {
    // console.log('updateMoviesLists')
    setIsSubmitting(true)

    getMyMovies()
      .then((myMoviesArray) => {
        localStorage.setItem('myFavoriteMoviesList', JSON.stringify(myMoviesArray))

        // очищать при окончания сессии веб-страницы: запрос к API при логине и при переходе с др. стр., но не при обновлении и возврте на стр. =>
        if (!sessionStorage.baseMoviesList) { // <= !!! - sessionStorage (=> чаще обновлять baseMoviesList, в т.ч. при работе с разных устройств)
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
                sessionStorage.setItem('baseMoviesList', JSON.stringify(temporaryList)) // обновл. массив в sessionStorage <= в /movies отрисовка с уч. избранного
              } else {
                sessionStorage.setItem('baseMoviesList', JSON.stringify(mainMoviesArray)) // полученный без изм. массив в sessionStorage
              }
            })
            .catch((err) => setErr(err))
        }
      })
      .catch((err) => setErr(err))
      .finally(() => setIsSubmitting(false))
  }


  const closePopup = () => {
    setInfoTooltipOpen(false)
    setMessageErr('')
    setErr('')
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

          <ProtectedRouteAuth exact path='/signin'
            component={Login}
            handleLoginSubmit={handleLoginSubmit}
            messageErr={messageErr}
          />

          <ProtectedRouteAuth exact path='/signup'
            component={Register}
            handleRegistrationSubmit={handleRegistrationSubmit}
            messageErr={messageErr}
          />

          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>

        {isSubmitting && <Preloader />}

        {withFooterURL.includes(location.pathname) && <Footer />}

        {
          infoTooltipOpen &&
          <InfoTooltip
            closePopup={ closePopup }
            icon={ messageErr ? UnionX : UnionV }
            notification={ messageErr ? messageErr : 'Request completed successfully!' }
          />
        }

      </div>
    </CurrentUser.Provider>
  )
}

export default App
