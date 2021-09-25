import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './App.css';
import { CurrentUser } from '../../contexts/CurrentUserContext';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../MoviesSaved/MoviesSaved';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import { deleteAuth, updateUser, register, authorize, findMovies, findInMyMovies } from '../../utils/api'
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import UnionV from '../../images/union-v.svg';
import UnionX from '../../images/union-x.svg';

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
import movie1 from '../../images/movie1.svg';
import movie2 from '../../images/movie2.svg';
import movie3 from '../../images/movie3.svg';
import movie4 from '../../images/movie4.svg';

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
    _id: 131,
    name: 'Gimme Danger: История Игги и The S Игги и The S',
    duration: '150',
    saved: false,
    url: movie4,
  },
  {
    _id: 434,
    name: '44 слова о дизайне',
    duration: '200',
    saved: false,
    url: movie1,
  },
  {
    _id: 333,
    name: 'Киноальманах «100 лет дизайна»',
    duration: '77',
    saved: true,
    url: movie2,
  },
  {
    _id: 222,
    name: 'В погоне за Бенкси',
    duration: '100',
    saved: false,
    url: movie3,
  },
  {
    _id: 121,
    name: 'Gimme Danger: История Игги и The S Игги и The S',
    duration: '150',
    saved: false,
    url: movie4,
  },
  {
    _id: 414,
    name: '44 слова о дизайне',
    duration: '200',
    saved: true,
    url: movie1,
  },
  {
    _id: 313,
    name: 'Киноальманах «100 лет дизайна»',
    duration: '77',
    saved: false,
    url: movie2,
  },
  {
    _id: 122,
    name: 'В погоне за Бенкси',
    duration: '100',
    saved: false,
    url: movie3,
  },
  {
    _id: 111,
    name: 'Gimme Danger: История Игги и The S Игги и The S',
    duration: '150',
    saved: true,
    url: movie4,
  },
]

const myMoviesTest = moviesTest.filter(movie =>
  movie.saved
)
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function App() {

  const history = useHistory()
  const location = useLocation(); // или > { pathname } = useLocation();
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const withFooterURL = ['/', '/movies', '/saved-movies']
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false)
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [moviesList, setMoviesList] = React.useState(moviesTest)

  const [currentUser, setCurrentUser] = React.useState({ name: 'Юрий', email: 'test@test.com' }); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // const [currentUser, setCurrentUser] = React.useState(); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const closePopup = () => {
    setInfoTooltipOpen(false)
  }

  // регистрация пользователя
  const handleRegistrationSubmit = ({ name, email, password }) => {
    setIsSubmitting(true);
    register({ name, email, password })
      .then(() => {
        setInfoTooltipOpen(true)
        setIsAuthSuccess(true);
        history.push('/signin')
        setTimeout(() => setInfoTooltipOpen(false), 3000);
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
    setIsSubmitting(true);
    authorize({ email, password })
      .then((data) => {
        // console.log(data)
        // setLoggedIn(true);
        // localStorage.setItem('isAuth', true); // маркер - true/false
        history.push('/')
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
        // console.log(data);
        // setCurrentUser({});
        // history.push('/');
        // setLoggedIn(false);
        // localStorage.removeItem('isAuth'); // маркер - true/false
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() =>
        setTimeout(() => setIsSubmitting(false), 15000) // <<<=====================
      )
  }

  // обновить данные пользователя
  const handleSubmitUpdateUser = ({ name, email }) => {
    console.log({ name, email })

    setIsSubmitting(true);
    updateUser({ name, email })
      .then(userData => {
        // setCurrentUser(userData)
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() => setIsSubmitting(false))
  }

  // результат поиска фильмов
  const handleSubmitSearchFormMovies = (queryString) => {
    setIsSubmitting(true)
    findMovies(queryString)
      .then((arrayWithMovies) => {
        // setMoviesList(arrayWithMovies)
      })
      .catch((err) => {
        console.log(err)
        setInfoTooltipOpen(true)
        setIsAuthSuccess(false)
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <CurrentUser.Provider value={currentUser}>

      <div className='app'>

        <Switch>

          <Route exact path='/'>
            <Main
            />
          </Route>

          <Route exact path='/movies'>
            <Movies
              moviesList={moviesList}
              handleSubmitSearchForm={handleSubmitSearchFormMovies}
            />
          </Route>

          <Route exact path='/saved-movies'>
            <SavedMovies
              moviesList={myMoviesTest}
            />
          </Route>

          <Route exact path='/profile'>
            <Profile
              handleLogout={handleLogout}
              handleSubmitUpdateUser={handleSubmitUpdateUser}
            />
          </Route>

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

        {isSubmitting && <Preloader />}

        {
          infoTooltipOpen &&
          <InfoTooltip
            popupIsOpen={infoTooltipOpen}
            closePopup={closePopup}
            icon={isAuthSuccess ? UnionV : UnionX}
            notification={isAuthSuccess ? 'Всё успешно!' : 'Что-то пошло не так...'}
          />
        }

      </div>
    </CurrentUser.Provider>
  );
}

export default App;
