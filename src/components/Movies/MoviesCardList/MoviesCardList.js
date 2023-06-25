import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom'

function MoviesCardList(props) {
  const location = useLocation();
  return (
    <section className={location.pathname.endsWith('/saved-movies') ? ("elements saved-elements") : ("elements")}>
      {props.cardsList.map((card) => (
        <MoviesCard
          key={card.id}
          card={card}
          {...props}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;