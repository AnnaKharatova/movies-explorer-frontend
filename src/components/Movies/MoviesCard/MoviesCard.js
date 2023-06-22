import './MoviesCard.css';

function MoviesCard({ card, className }) {
    function handleLikeButton(event) {
        const likeButton = event.target;
        if (likeButton.classList.contains('element__button')) {
            likeButton.classList.toggle('element__button_active');
          }
    }

    return (
        <article className="element">
            <img className="element__image" src={card.image} alt={`кадр из фильма ${card.title}`} />
            <div className="element__info">
                <h2 className="element__title">{card.title}</h2>
                <button onClick={handleLikeButton} className={className} type='button'></button>
            </div>
            <div className="element__caption">1ч42м</div>
        </article>
    );
}

export default MoviesCard;