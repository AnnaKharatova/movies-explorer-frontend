import './SearchForm.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm(props) {
    return (
        <>
            <section className="search">
                <input className="search__input" placeholder="Фильм" />
                <button className="search__button" type='button'>Найти</button>
                <FilterCheckbox />
            </section>
            <MoviesCardList {...props} />
            <section className="more">
                <button className="more__button" type='button'>Еще</button>
            </section>
        </>
    );
}

export default SearchForm;





