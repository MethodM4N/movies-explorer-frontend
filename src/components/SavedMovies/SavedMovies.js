import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

function SavedMovies() {
   return (
      <>
         <SearchForm />
         <MoviesCardList />
         <Footer />
      </>
   )
}

export default SavedMovies;