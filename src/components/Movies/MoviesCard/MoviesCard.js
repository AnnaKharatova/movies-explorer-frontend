import './MoviesCard.css';
import React from 'react';

import { useLocation } from 'react-router-dom';

function MoviesCard({ card, savedMovies, deleteCard, saveCard }) {
    const location = useLocation();
    const locationMovies = location.pathname.endsWith('/movies')
    const inSavedList=savedMovies.find(c => c.movieId === card.id)

    function updateFavourite(event) {
        const likeButton = event.target;
        if (likeButton.classList.contains('element__button_active')) {
            likeButton.classList.remove('element__button_active');
            deleteCard(inSavedList)
          } else {
            saveCard(card)
            likeButton.classList.add('element__button_active');
          }
      }

    function handleDeleteButton() {
        deleteCard(card)
    }

    return (
        <article className="element">
            <a href={card.trailerLink} target='blank'>
                <img className="element__image" src={locationMovies ? `https://api.nomoreparties.co/${card.image.url}` : card.image} alt={`кадр из фильма ${card.nameRU}`} />
            </a>
            <div className="element__info">
                <h2 className="element__title">{card.nameRU}</h2>
                {locationMovies ?
                    (<button onClick={updateFavourite} className={inSavedList ? 'element__button element__button_active' : 'element__button'} type='button'></button>) :
                    (<button onClick={handleDeleteButton} className='element__button-delete' type='button'></button>)
                }
            </div>
            <div className="element__caption">{card.duration}</div>
        </article>
    );
}

export default MoviesCard;