import React from "react";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
// import Preloader from '../Movies/Preloader/Preloader'

function App() {

  const history = useHistory();
  const location = useLocation(); // или > { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const withFooterURL = ['/', '/movies', '/saved-movies'];

  return (
    <div className="app">

      <Switch>

        <Route exact path="/">
          <Main
          />
        </Route>

        <Route exact path="/movies">
          <Movies
          />
        </Route>

        <Route exact path="/saved-movies">
          <SavedMovies
          />
        </Route>

        {/* <Route exact path="/profile">
          <Profile
          />
        </Route> */}

        {/* <Route exact path="/signin">
          <Login
          />
        </Route> */}

        {/* <Route exact path="/signup">
          <Register
          />
        </Route> */}

        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>

      {/* <Preloader /> */}

      {withFooterURL.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
