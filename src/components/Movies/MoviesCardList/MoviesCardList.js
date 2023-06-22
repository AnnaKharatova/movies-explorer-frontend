import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
  return (
    <section className="elements">
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