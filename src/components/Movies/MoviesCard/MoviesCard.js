import imageExample from '../../../images/movie-image-example.jpg'
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
   let location = useLocation();
   const [clicked, setclicked] = useState(true);

   function handleSaveClick() {
      clicked ? 
      setclicked(false) :
      setclicked(true);
   }

   return (
      <div className="moviesCard">
         <img src={imageExample  } className="moviesCard__photo" alt="Фильм" />
         <div className="moviesCard__container">
            <h2 className="moviesCard__title">33 слова о дизайне</h2>
            {location.pathname === '/movies'? (
               <button onClick={handleSaveClick} className="moviesCard__subscription" type="checkbox" aria-label="Добавить в избранное">
                  <label className={`${clicked ? 'moviesCard__subscription_checked' : 'moviesCard__subscription_unchecked'}`}></label>
               </button> 
               ) : (
               <button type="button" className='moviesCard__delete'></button>
            )}
         </div>
         <p className="moviesCard__duration">1ч42м</p>
      </div>
   )
}

export default MoviesCard;