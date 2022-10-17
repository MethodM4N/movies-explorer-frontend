import MoviesCard from '../../Movies/MoviesCard/MoviesCard';

function MoviesCardList() {

   return (
      <section className="moviesCardList">
         <div className="moviesCardList__container moviesCardList__container_saved">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
         </div>
      </section>
   )
}

export default MoviesCardList;