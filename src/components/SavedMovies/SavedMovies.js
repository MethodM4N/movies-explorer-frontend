import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';

function SavedMovies( { savedMovies, onCardDelete } ) {
   const [searchQuery, setSearchQuery] = useState('');
   const [foundMovies, setFoundMovies] = useState(savedMovies);

   function handleCheckboxClick(isChecked) {
      handleSearchMovies(searchQuery, isChecked);
   }

   function handleChangeSearchQuery(value) {
      setSearchQuery(value);
   }

   function searchMovies(movies, searchQuery) {
      if (searchQuery !== undefined) {
         const searchItems = movies.filter((item) => (item.nameRU.toLowerCase().includes(searchQuery.toLowerCase())));
         return searchItems;
      }
   }

   function handleSearchMovies(searchQuery, onlyShortMovies) {
      if (searchQuery) {
         if (onlyShortMovies) {
            const shortMovies = savedMovies.filter(item => item.duration <= 40)
            setFoundMovies(searchMovies(shortMovies, searchQuery));
         }
         else {
            setFoundMovies(searchMovies(savedMovies, searchQuery));
         }
      } else {
         if (onlyShortMovies) {
            const shortMovies = savedMovies.filter(item => item.duration <= 40)
            setFoundMovies(shortMovies);
         }
         else {
            setFoundMovies(savedMovies);
         }
      }
   };

   useEffect(() => {
      setFoundMovies(savedMovies)
   }, [savedMovies])

   return (
      <>
         <SearchForm 
            searchQuery={searchQuery}
            onSearchMovies={handleSearchMovies}
            onCheckboxClick={handleCheckboxClick}
            handleChange={handleChangeSearchQuery}
            isCheckbox={false}/>
         <MoviesCardList 
            savedMovies={foundMovies}
            onCardDelete={onCardDelete}/>
         <Footer />
      </>
   )
}

export default SavedMovies;