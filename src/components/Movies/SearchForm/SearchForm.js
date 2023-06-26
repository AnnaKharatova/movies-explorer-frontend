import './SearchForm.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';


function SearchForm(props) {
    const location = useLocation();
    return (
        <>
            <section className="search">
                <form className='search__form'>
                    <input className="search__input" type='search' placeholder="Фильм" />
                    <button className="search__button" type='button'>Найти</button>
                </form>
                <FilterCheckbox />
            </section>
            <MoviesCardList {...props} />
            {location.pathname.endsWith('/movies') ?
                (<section className="more">
                    <button className="more__button" type='button'>Еще</button>
                </section>) : (
                    <div className='more-space'></div>
                )
            }
        </>
    );
}

export default SearchForm;





