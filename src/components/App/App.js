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
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const history = useHistory();
  const location = useLocation(); // или > { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const withFooterURL = ['/', '/movies', '/saved-movies'];

  const [currentUser, setCurrentUser] = React.useState({ name: 'Юрий', email: 'test@test.com' }); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // const [currentUser, setCurrentUser] = React.useState(); // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  // регистрация пользователя
  const handleRegistrationSubmit = ({ name, email, password }) => {
    console.log({ name, email, password })
  }

  // авторизация пользователя
  const handleLoginSubmit = ({ email, password }) => {
    console.log({ email, password })
  }

  // выйти из аккаунта
  const handleLogout = () => {
    console.log('Вышел из аккаунта')
  }

  // обновить данные пользователя
  const handleSubmitUpdateUser = ({ name, email }) => {
    console.log({ name, email })
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
            />
          </Route>

          <Route exact path='/saved-movies'>
            <SavedMovies
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
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
