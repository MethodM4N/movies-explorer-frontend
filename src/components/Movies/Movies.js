import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import Preloader from '../Preloader/Preloader'
import { useEffect } from 'react';
import { LocalStorageMovies } from '../../utils/LocalStorageMovies'

function Movies( { errorMessage, onCardSave, onCardDelete, savedMovies, isLoading } ) {
  const [movies] = LocalStorageMovies("movies", "");
  const [searchQuery, setSearchQuery] = LocalStorageMovies("searchQuery", "");
  const [isSubmitted, setIsSubmitted] = LocalStorageMovies("isSubmitted", "");
  const [isCheckbox, setIsCheckbox] = LocalStorageMovies("checkbox", "");
  const [foundMovies, setFoundMovies] = LocalStorageMovies("foundMovies", []);

  function handleChangeSearchQuery(value) {
    setSearchQuery(value);
    setIsSubmitted(false);
  }

  function handleCheckboxClick(isChecked) {
    setIsCheckbox(isChecked);
  }

  function handleSearchMovies() {
    setIsSubmitted(true);
  }

  function searchMovies(movies, searchQuery) {
    let searchItems = [];
    let searchShortItems = [];
    if (searchQuery && isSubmitted) {
      movies.filter((item) => {
        if (item.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) {
          searchItems.push(item);
        }
      });
      if (isCheckbox) {
        searchItems.filter((item) => {
          if (item.duration <= 40) {
            searchShortItems.push(item);
          }
        });
        searchItems = searchShortItems;
      }
    }
    return searchItems;
  }

  useEffect(() => {
    if (isSubmitted) {
      if (isCheckbox) {
        const shortMovies = movies.filter(item => item.duration <= 40)
        setFoundMovies(searchMovies(shortMovies, searchQuery));
      } else {
        setFoundMovies(searchMovies(movies, searchQuery));
      }
    }
  }, [isCheckbox, isSubmitted])

  return (
      <>
        <SearchForm 
        isCheckbox={isCheckbox}
        searchQuery={searchQuery}
        onSearchMovies={handleSearchMovies}
        handleChange={handleChangeSearchQuery}
        onCheckboxClick={handleCheckboxClick} />
        {errorMessage ? <p className="preloader__text">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : ''}
        {searchQuery && !errorMessage && isSubmitted && foundMovies.length === 0 ? <p className="preloader__text">Ничего не найдено.</p> : ''}
        {isLoading ?
        <Preloader /> :
        <MoviesCardList
        movies={foundMovies}
        savedMovies={savedMovies}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete} />}
        <Footer />
      </>
  )
}

export default Movies;