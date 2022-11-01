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
  const [profileMessage, setProfileMessage] = useState('');
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
        handleUserSignIn(data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
          setErrorMessage(null);
          setIsLoading(false);
        }, 2500);
      })
  }

  function handleUserSignIn(data) {
    setIsLoading(true);
    mainApi.signIn(data)
      .then((res) => {
        if (res.message === 'Вход совершен успешно') {
          setLoggedIn(true);
          handleInitialCards();
          checkToken();
          history.push('/movies');
        }
      }
      )
      .catch((err) => {
        setLoggedIn(false);
        setErrorMessage(err.message);
        console.log(err);
      })
      .finally(() => {
        setTimeout(function () {
          setErrorMessage(null);
          setIsLoading(false);
        }, 2500);
      })
  }

  function handleUserSignOut() {
    setIsLoading(true);
    mainApi.signOut()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          deleteStorage();
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
        handleGetMovies();
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        deleteStorage();
        setCurrentUser('');
        setSavedMovies([]);
        console.log(err);
      })
  }, [])

  function deleteStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('isSubmitted');
    localStorage.removeItem('foundMovies');
  }

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
        setProfileMessage('Профиль изменен')
      })
      .catch((err) => {
        setProfileMessage(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        checkToken();
        setTimeout(function () {
          setProfileMessage(null);
        }, 2500);
      });
  }

  // Movies

  function handleInitialCards() {
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
  }

  useEffect(() => {
    handleInitialCards();
  }, [loggedIn]);

  function handleMovieSave(card) {
    return mainApi.saveMovie(card)
      .then((newCard) => {
        setSavedMovies([newCard.data, ...savedMovies]);
        setErrorMessage("");
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleMovieDelete(card) {
    let deleteSavedCard = savedMovies.find(item => item.movieId === card.id);
    return mainApi.deleteMovie(deleteSavedCard)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item.movieId !== card.id));
        setErrorMessage("");
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleSavedMovieDelete(card) {
    let deleteSavedCard = savedMovies.find(item => item.movieId === card.movieId)
    return mainApi.deleteMovie(deleteSavedCard)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item.movieId !== card.movieId));
        setErrorMessage("");
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleGetMovies() {
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
          feedbackMessage = {profileMessage}
          onEditProfile={handleUpdateProfile}
          onLogout={handleUserSignOut}
          >
          </ProtectedRoute>

          <Route path="/signup">
            <Register
            loggedIn={loggedIn}
            history={history}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onRegister={handleUserSignUp} />
          </Route>

          <Route path="/signin">
            <Login
            loggedIn={loggedIn}
            history={history}
            isLoading={isLoading}
            errorMessage={errorMessage}
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
