import './SearchForm.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import { saveMovie, deleteMovie } from '../../../utils/MainApi';
import { useLocation } from 'react-router-dom';

function SearchForm({
    preloader,
    onSubmit,
    cardsList,
    onChange,
    savedMovies,
    errorMessage,
    isShortMovies,
    setIsShortMovies,
    searchText,
    setSearchText,
    setSavedMovies,
    setSavedCardsList,
}) {
    const location = useLocation();
    const locationSavedMovies = location.pathname.endsWith('/saved-movies')
    const handleChange = (event) => {
        const { value } = event.target;
        const valueToLowerCase = value.toLowerCase()
        setSearchText(valueToLowerCase);
        onChange()
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit()
    };

    function saveCard(card) {
        saveMovie(card)
            .then((data) => {
                setSavedMovies([...savedMovies, data])
                console.log("карточка сохранена")
            })
            .catch((err) => {
                console.log('Ошибка сохранения карточки ', err)
            })
    }

    function deleteCard(card) {
        deleteMovie(card._id)
            .then(() => {
                if (locationSavedMovies) {
                    const newShownCards = cardsList.filter((c) => c._id !== card._id)
                    setSavedCardsList(newShownCards);
                }
                const newCards = savedMovies.filter((c) => c._id !== card._id)
                setSavedMovies(newCards);
                console.log("Карточка удалена");
            })
            .catch((err) => {
                console.log('Ошибка удаления карточки ', err)
            });
    };

    return (
        <>
            <section className="search">
                <form className='search__form' onSubmit={handleSubmit}>
                    <input className="search__input" type="text" value={searchText} onChange={handleChange} placeholder="Фильм" />
                    <button className="search__button" type='submit'>Найти</button>
                </form>
                <FilterCheckbox isShortMovies={isShortMovies} setIsShortMovies={setIsShortMovies} />
            </section>
            <section className='content'>
                {errorMessage && <span className="content__error-message">{errorMessage}</span>}
                {preloader && <Preloader />}
                {!preloader && !errorMessage && (<MoviesCardList cardsList={cardsList} deleteCard={deleteCard} saveCard={saveCard} savedMovies={savedMovies} />)}
            </section>
        </>
    );
}

export default SearchForm;