import MoviesCard from '../MoviesCard/MoviesCard';
import moviesApi from "../../../utils/MoviesApi";
import { useState, useEffect } from 'react';

function MoviesCardList({ movies, onCardSave, onCardDelete, savedMovies }) {
  const cards = movies;
  const [cardsCount, setCardsCount] = useState(0);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(true);
  const windowWidth = window.innerWidth;

  const handleMoreButtonClick = () => {
    if (windowWidth > 1020) {
      setCardsCount(cardsCount + 3);
    } else {
      setCardsCount(cardsCount + 2);
    }
  };

  useEffect(() => {
    if (cardsCount >= cards.length) {
      setIsMoreButtonVisible(false);
    } else {
      setIsMoreButtonVisible(true);
    }
    if(cardsCount === 0)
    { setIsMoreButtonVisible(false);
    }}, [cardsCount, cards]);

      
  useEffect(() => {
    if (windowWidth > 768) {
      setCardsCount(12);
    } else if (windowWidth > 480 && windowWidth < 768) {
      setCardsCount(8);
    } else {
      setCardsCount(5);
    }
  }, [windowWidth]);
    
  return (
      <section className="moviesCardList">
        <div className="moviesCardList__container">
          {cards.slice(0, cardsCount).map((item) => (
            <MoviesCard 
            key={item.id} 
            cardItem={item}
            src={moviesApi.url+item.image.url} 
            name={item.nameRU} 
            duration={item.duration}
            trailerLink={item.trailerLink}
            onCardSave={onCardSave}
            savedMovies={savedMovies}
            onCardDelete={onCardDelete} />
          ))}
        </div>
        <button className={`moviesCardList__button ${!isMoreButtonVisible ? 'moviesCardList__button_hidden' : ''}`}  onClick={handleMoreButtonClick}>Ещё</button>
      </section>
  )
}

export default MoviesCardList;