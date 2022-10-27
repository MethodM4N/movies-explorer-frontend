import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Movies from '../components/Movies/Movies';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Page404 from '../components/Page404/Page404';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import moviesApi from "../utils/MoviesApi";
import { mainApi } from "../utils/MainApi";

function App() {
  let location = useLocation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [isHeaderNavigationOpen, setIsHeaderNavigationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  function handleHeaderNavigationClose() {
    setIsHeaderNavigationOpen(false)
  }

  function handleHeaderNavigationOpen() {
    setIsHeaderNavigationOpen(true)
  }

  function handleUserSignUp(data) {
    setIsLoading(true);
    mainApi.signUp(data)
      .then(() => {
        history.push('/signin');
        setErrorMessage(false);
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUserSignIn(data) {
    setIsLoading(true);
    mainApi.signIn(data)
      .then((res) => {
        if (res.message === 'Вход совершен успешно') {
          setLoggedIn(true);
          history.push('/movies');
        }
      }
      )
      .catch((err) => {
        setLoggedIn(false);
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUserSignOut() {
    setIsLoading(true);
    mainApi.signOut()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          localStorage.removeItem('token');
          localStorage.removeItem('movies');
          localStorage.removeItem('searchQuery');
          localStorage.removeItem('checkbox');
          localStorage.removeItem('isSubmitted');
          localStorage.removeItem('foundMovies');
          setErrorMessage(false);
          setIsLoading(false);
          setCurrentUser('');
          setSavedMovies([]);
        }
      }
      ).catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setErrorMessage(false);
      })
  }

  const checkToken = useCallback(() =>  {
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser(res.data);
        handleGetMovie();
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (loggedIn) {
      checkToken()
    }
  }, [checkToken, loggedIn]);

  function handleUpdateProfile(profile) {
    setIsLoading(true);
    mainApi.updateUserInfo(profile)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Movies

  useEffect(() => {
    setIsLoading(true)
    moviesApi
      .getInitialCards()
      .then(data => {
        localStorage.setItem('movies', JSON.stringify(data));
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, [loggedIn]);

  function handleMovieSave(card) {
    return mainApi.saveMovie(card)
      .then((newCard) => {
        setSavedMovies([newCard.data, ...savedMovies]);
        setErrorMessage("");
      })
      .catch(err => {
        setErrorMessage(err);
        console.log(err)
      })
      .finally(() => {
        setTimeout(function () {
          setErrorMessage("");
        }, 2500);
      });
  }

  function handleMovieDelete(card) {
    let deleteSavedCard = savedMovies.find(item => item.movieId === card.id);
    return mainApi.deleteMovie(deleteSavedCard)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item.movieId !== card.id));
        setErrorMessage("");
      })
      .catch(err => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
          setErrorMessage("");
        }, 2500);
      });
  }

  function handleSavedMovieDelete(card) {
    let deleteSavedCard = savedMovies.find(item => item.movieId === card.movieId)
    return mainApi.deleteMovie(deleteSavedCard)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item.movieId !== card.movieId));
        setErrorMessage("");
      })
      .catch(err => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
          setErrorMessage("");
        }, 1500);
      });
  }

  function handleGetMovie() {
    mainApi.getSavedMovies()
    .then((res) => {
      setSavedMovies(res.data);
      })
      .catch(err => {
        setErrorMessage(err);
        console.log(err);
      })
  }

  useEffect(() => {
    const usersSavedMovies = [];
    savedMovies.forEach(savedMovie => {
      if (savedMovie.owner === currentUser._id) {
        usersSavedMovies.push(savedMovie);
      }
    })
    setFiltredSavedMovies(usersSavedMovies);
  }, [savedMovies]);

  return (
      <>
      <CurrentUserContext.Provider value={currentUser}>
        {location.pathname === '/signup' || location.pathname === '/signin'
        || location.pathname === "*" ? null : (<Header loggedIn={loggedIn} isOpen={isHeaderNavigationOpen}
        onClose={handleHeaderNavigationClose} onClick={handleHeaderNavigationOpen} />)}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute 
          exact path="/movies"
          component={Movies}
          isLoading={isLoading}
          loggedIn={loggedIn}
          errorMessage={errorMessage}
          savedMovies={filtredSavedMovies}
          onCardSave={handleMovieSave}
          onCardDelete={handleMovieDelete}>
          </ProtectedRoute>

          <ProtectedRoute 
          exact path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          savedMovies={filtredSavedMovies}
          onCardDelete={handleSavedMovieDelete}>
          </ProtectedRoute>

          <ProtectedRoute 
          exact path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          onEditProfile={handleUpdateProfile}
          onLogout={handleUserSignOut}
          >
          </ProtectedRoute>

          <Route path="/signup">
            <Register
            onRegister={handleUserSignUp} />
          </Route>

          <Route path="/signin">
            <Login
            onLogin={handleUserSignIn} />
          </Route>

          <Route path="*">
            <Page404 />
          </Route>

        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
