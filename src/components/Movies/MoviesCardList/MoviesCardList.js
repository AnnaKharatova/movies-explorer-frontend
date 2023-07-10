import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom'

function MoviesCardList({savedMovies, cardsList, deleteCard, saveCard}) {
  const location = useLocation();
  return (
    <section className={location.pathname.endsWith('/saved-movies') ? ("elements saved-elements") : ("elements")}>
      {cardsList.map((card) => (
        <MoviesCard
          key={card._id || card.id}
          card={card}
          savedMovies={savedMovies}
          deleteCard={deleteCard}
          saveCard={saveCard}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;