import { useLocation } from 'react-router-dom';

function MoviesCard({ cardItem, src, name, duration, trailerLink, onCardSave, onCardDelete, savedMovies }) {
   let location = useLocation();
   const hour = Math.floor(parseInt(duration)/60);
   const min = parseInt(duration)%60;
   const getTime = (hour===0) ? (min.toString() + "м") : (hour.toString() + "ч " + min.toString() + "м");
   const isSaved = savedMovies.some(i => i.movieId === cardItem.id);

   function handleSaveClick() {
      if(!isSaved) {
         onCardSave(cardItem);
      } else {
         onCardDelete(cardItem);
      }
   }

   function handleClick() {
      window.open(trailerLink, '_blank');
   }

   function handleDeleteClick() {
      onCardDelete(cardItem);
   }

   return (
      <div className="moviesCard">
         <img src={src} alt={name} className="moviesCard__photo" onClick={handleClick}/>
         <div className="moviesCard__container">
            <h2 className="moviesCard__title">{name}</h2>
            {location.pathname === '/movies'? (
               <button onClick={handleSaveClick} className="moviesCard__subscription" type="checkbox" aria-label="Добавить в избранное">
                  <label className={ `${isSaved ? 'moviesCard__subscription_checked' : 'moviesCard__subscription_unchecked'}`}></label>
               </button> 
               ) : (
               <button type="button" className='moviesCard__delete' onClick={handleDeleteClick}></button>
            )}
         </div>
         <p className="moviesCard__duration">{getTime}</p>
      </div>
   )
}

export default MoviesCard;