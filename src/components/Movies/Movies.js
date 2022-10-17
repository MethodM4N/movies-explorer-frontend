import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

function Movies() {
   return (
      <>
         <SearchForm />
         <MoviesCardList />
         <Footer />
      </>
   )
}

export default Movies;