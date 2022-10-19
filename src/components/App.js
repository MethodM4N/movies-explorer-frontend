import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Movies from '../components/Movies/Movies';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Page404 from '../components/Page404/Page404';

function App() {
  let location = useLocation();

  const [loggedIn, setLoggedIn] = useState(true);
  const [isHeaderNavigationOpen, setIsHeaderNavigationOpen] = useState(false);

  function handleHeaderNavigationClose() {
    setIsHeaderNavigationOpen(false)
  }

  function handleHeaderNavigationOpen() {
    setIsHeaderNavigationOpen(true)
  }

  useEffect(() => {
    location.pathname === '/' ? setLoggedIn(false) : setLoggedIn(true)
  }, [location.pathname]); 

  return (
      <>
      {location.pathname === '/signup' || location.pathname === '/signin'
      || location.pathname === '/notfound' ?
      ( <></> ) : (<Header loggedIn={loggedIn} isOpen={isHeaderNavigationOpen}
      onClose={handleHeaderNavigationClose} onClick={handleHeaderNavigationOpen} />)}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/notfound">
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
