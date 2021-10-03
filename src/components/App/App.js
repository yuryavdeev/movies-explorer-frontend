import React from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import './App.css'
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUser } from '../../contexts/CurrentUserContext'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
// import Header from '../Header/Header'
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

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
import movie1 from '../../images/movie1.svg'
import movie2 from '../../images/movie2.svg'
import movie3 from '../../images/movie3.svg'

const moviesTest = [
  {
    _id: 44,
    name: '44 слова о дизайне',
    duration: '200',
    saved: true,
    url: movie1,
  },
  {
    _id: 33,
    name: 'Киноальманах «100 лет дизайна»',
    duration: '77',
    saved: false,
    url: movie2,
  },
  {
    _id: 22,
    name: 'В погоне за Бенкси',
    duration: '100',
    saved: false,
    url: movie3,
  },
  {
    _id: 22,
    name: 'В погоне за Бенкси',
    duration: '100',
    saved: false,
    url: movie3,
  },
  {
    _id: 33,
    id: 2332902,
    name: 'Киноальманах «100 лет дизайна»',
    duration: '77',
    saved: false,
    url: movie2,
  },
]
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function App() {

  const history = useHistory()
  const location = useLocation() // или > { pathname } = useLocation()
  const [currentUser, setCurrentUser] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState(false)
  const withFooterURL = ['/', '/movies', '/saved-movies']
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false)
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  // const [mainMoviesList, setMainMoviesList] = React.useState([])
  


// console.log([...new Set(moviesTest)])


// console.log(moviesTest.indexOf({
//   _id: 22,
//   name: 'В погоне за Бенкси',
//   duration: '100',
//   saved: false,
//   url: movie3,
// }))


  // авторизация при входе
  React.useEffect(() => {
    if (localStorage.isAuth) {
      getUser()
        .then((userData) => {
          setLoggedIn(true); // xxxxxxxxxxxxxxxxxxxxxxxx ЗАЧЕМ
          setCurrentUser(userData); 
          // history.push('/') // wwwwwwwwwwwwww отд. ф-ю
        })
        .catch(err => {
          console.log(err);
          history.push('/signin')
        })
    }
  }, []);

  // // изм списка всех фильмов
  // React.useEffect(() => {
  //   localStorage.moviesList && setMainMoviesList(JSON.parse(localStorage.getItem('moviesList')))
  //   console.log('App - переписал основной список')
  // }, [window.onstorage]);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     getUser()
  //       .then((userData) => {
  //         setCurrentUser(userData);
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }, [loggedIn]);

  const closePopup = () => {
    setInfoTooltipOpen(false)
  }

  // регистрация пользователя
  const handleRegistrationSubmit = ({ name, email, password }) => {
    setIsSubmitting(true)
    register({ name, email, password })
      .then((userData) => {
        console.log(userData)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(true)
        setCurrentUser(userData);
        history.push('/movies')
        setTimeout(() => setInfoTooltipOpen(false), 3000)
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  // авторизация пользователя
  const handleLoginSubmit = ({ email, password }) => {
    setIsSubmitting(true)
    authorize({ email, password })
      .then((userData) => {
        console.log(userData)
        setLoggedIn(true)
        setCurrentUser(userData);
        localStorage.setItem('isAuth', true) // маркер - true/false
        history.push('/movies')
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() => setIsSubmitting(false))
  }

  // выйти из аккаунта
  const handleLogout = () => {
    setIsSubmitting(true)
    deleteAuth()
      .then((data) => {
        console.log(data)
        setLoggedIn(false)
        setCurrentUser()
        history.push('/')
        localStorage.removeItem('isAuth') // маркер - true/false
        localStorage.removeItem('moviesList') // - или по истечении ВРЕМЕНИ
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() => setIsSubmitting(false))
  }

  // обновить данные пользователя
  const handleSubmitUpdateUser = ({ name, email }) => {
    console.log({ name, email })

    setIsSubmitting(true)
    updateUser({ name, email })
      .then(userData => {
        setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() =>
        setTimeout(() => setIsSubmitting(false), 3000) // <<<=====================
      )
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

          {loggedIn &&  // при перезагрузке иначе - loggedIn = false xxxxxxxxxxxxxxxxxxxxx effect - на загрузку филмов это должен убрать - ?
            <ProtectedRoute exact path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              // mainMoviesList={mainMoviesList}
            />
          }

          {loggedIn &&  // при перезагрузке иначе - loggedIn = false xxxxxxxxxxxxxxxxxxxxx
            <ProtectedRoute exact path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
            // moviesList={myMoviesTest}
            />
          }

          {loggedIn &&  // при перезагрузке иначе - loggedIn = false xxxxxxxxxxxxxxxxxxxxx
            <ProtectedRoute exact path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
              handleSubmitUpdateUser={handleSubmitUpdateUser}
            />
          }

          <Route exact path='/signin'>
            <Login
              handleLoginSubmit={handleLoginSubmit}
            />
          </Route>

          <Route exact path='/signup'>
            <Register
              handleRegistrationSubmit={handleRegistrationSubmit}
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
            icon={isAuthSuccess ? UnionV : UnionX}
            notification={isAuthSuccess ? 'Всё успешно!' : 'Что-то пошло не так...'}
          />
        }

      </div>
    </CurrentUser.Provider>
  )
}

export default App
