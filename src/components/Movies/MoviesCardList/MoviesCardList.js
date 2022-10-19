import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

   return (
      <section className="moviesCardList">
         <div className="moviesCardList__container">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
         </div>
         <button className="moviesCardList__button">Ещё</button>
      </section>
   )
}

export default MoviesCardList;