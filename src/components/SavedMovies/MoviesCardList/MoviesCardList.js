import MoviesCard from '../../Movies/MoviesCard/MoviesCard';

function MoviesCardList( { savedMovies, onCardDelete } ) {
   const savedCards = savedMovies;

   return (
      <section className="moviesCardList">
         <div className="moviesCardList__container moviesCardList__container_saved">
            {
               savedCards.map((item) => (
                  <MoviesCard 
                  key={item._id} 
                  savedMovies={savedMovies}
                  cardItem={item} 
                  src={item.thumbnail} 
                  name={item.nameRU} 
                  trailerLink={item.trailerLink}
                  duration={item.duration}
                  onCardDelete={onCardDelete}/>
                  ))
            }
         </div>
      </section>
   )
}

export default MoviesCardList;