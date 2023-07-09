import './FilterCheckbox.css';
import { useLocation } from 'react-router-dom';


function FilterCheckbox({ isShortMovies, setIsShortMovies }) {

    const location = useLocation();
    const locationMovies = location.pathname.endsWith('/movies')

    function handleChange(event) {
        const newValue = event.target.checked;
        setIsShortMovies(newValue);
        if (locationMovies) {
            localStorage.setItem('moviesIsShortMovies', String(newValue));
        } else {
            localStorage.setItem('savedIsShortMovies', String(newValue));
        };
    }
    return (
        <section className="checkbox">
            <label className="checkbox__switch" htmlFor='checkbox'>
                <input type='checkbox' id='checkbox' checked={isShortMovies} onChange={handleChange} className='checkbox__input' />
                <span className="checkbox__slider" />
                <span className="checkbox__item">Короткометражки</span>
            </label>

        </section>
    );
}

export default FilterCheckbox;





