import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom';
import api from '../../../utils/MoviesApi';
import { saveMovie, deleteMovie, getMovies } from '../../../utils/MainApi';

function SearchForm({savedMovies, setSavedMovies, allMovies}) {
    const location = useLocation();
    const locationMovies = location.pathname.endsWith('/movies')

    const [searchText, setSearchText] = useState('');
    const [cards, setCards] = useState(allMovies);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [preloader, setPreloader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [cardsPerRow, setCardsPerRow] = useState(0);
    const [loadMoreCount, setLoadMoreCount] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [displayedMovies, setDisplayedMovies] = useState(cardsPerRow)
    const [savedCards, setSavedCards] = useState(savedMovies)

    /*useEffect(()=> {
        setSavedCards(savedMovies)
        setCards(allMovies)
    },[savedCards, cards])*/

    const locationCards = locationMovies ? cards : savedCards
    const filteredMovies = locationCards.filter(card => card.nameRU.toLowerCase().includes(searchText));
    const filteredShortMovies = isShortMovies ? filteredMovies.filter((film) => film.duration <= 40) : filteredMovies;
    const movies = filteredShortMovies.slice(0, displayedMovies)

    const handleChange = (event) => {
        const { name, value } = event.target;
        const valueToLowerCase = value.toLowerCase()
        setSearchText(valueToLowerCase);
        setErrorMessage('')
        setDisplayedMovies(cardsPerRow)
    };

    //resize

    useEffect(() => {
        const handleResize = () => {
            setTimeout(() => {
                setWindowWidth(window.innerWidth);
                setDisplayedMovies(cardsPerRow)
            }, 200)
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth, cardsPerRow]);

    useEffect(() => {
        if (windowWidth < 725) {
            setCardsPerRow(1);
            setLoadMoreCount(2);
        } else if (windowWidth < 990) {
            setCardsPerRow(2);
            setLoadMoreCount(2);
        } else if (windowWidth < 1280) {
            setCardsPerRow(3);
            setLoadMoreCount(3);
        } else {
            setCardsPerRow(4);
            setLoadMoreCount(4);
        }
    }, [windowWidth]);
  
    //localStorage

    useEffect(() => {
        if (locationMovies) {
            const query = localStorage.getItem('moviesSearchText');
            const storageMovies = localStorage.getItem('moviesData');
            const storedIsShortMovies = localStorage.getItem('moviesIsShortMovies');
            if (query) {
                setSearchText(query);
            }
            if (storageMovies) {
                setCards(JSON.parse(storageMovies));
                setDisplayedMovies(cardsPerRow+displayedMovies)
            }
            if(storedIsShortMovies) {
                setIsShortMovies(storedIsShortMovies === 'true');
            }
        }
    }, [cardsPerRow, locationMovies]);

    useEffect(() => {
        if (!locationMovies) {
            const savedQuery = localStorage.getItem('savedSearchText');
            const storageMovies = localStorage.getItem('savedMovies');
            const storedIsShortMovies = localStorage.getItem('savedIsShortMovies');

            if (savedQuery) {
                setSearchText(savedQuery);
            }
            if (storageMovies) {
                setSavedCards(JSON.parse(storageMovies));
                setDisplayedMovies(cardsPerRow+displayedMovies)
            }
            if(storedIsShortMovies) {
                setIsShortMovies(storedIsShortMovies === 'true');
            }
        }
    }, [cardsPerRow, locationMovies])


        //movies

    const handleSubmitMovies = (event) => {
        event.preventDefault();
        if (searchText.trim() === '') {
            setErrorMessage('Нужно ввести ключевое слово');
            setDisplayedMovies(0)
            return;
        }
        setErrorMessage('');
        setDisplayedMovies(cardsPerRow)
        setErrorMessage('');
        localStorage.setItem('moviesSearchText', searchText);
        api.getAllMovies()
            .then(
                setPreloader(true)
            )
            .then((data) => {
                setCards([...data]);
                setDisplayedMovies(displayedMovies);
                localStorage.setItem('moviesData', JSON.stringify(data));
                if(movies.length === 0) {
                    setErrorMessage("Ничего не найдено")
                }

            })
            .catch(() => {
                setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
            .finally(() => setPreloader(false))
    };

    function moreMovies() {
        setDisplayedMovies(displayedMovies + loadMoreCount)
    }

    // saved-movies

    function handleSubmitSavedMovies(event) {
        event.preventDefault();
        if (searchText.trim() === '') {
            setErrorMessage('Нужно ввести ключевое слово');
            setDisplayedMovies(0)
            return;
        }
        setErrorMessage('');
        setDisplayedMovies(cardsPerRow)
        setErrorMessage('');
        localStorage.setItem('savedSearchText', searchText);

        getMovies()
            .then(setPreloader(true)
            )
            .then((data) => {
                setSavedCards([...data]);
                setDisplayedMovies(cardsPerRow);
                localStorage.setItem('savedMovies', JSON.stringify(data));
                if(movies.length === 0) {
                    setErrorMessage("Ничего не найдено")
                }
            })
            .catch(error => {
                setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
            .finally(() => setPreloader(false))
    }

    // card

    function deleteCard(card) {
        deleteMovie(card._id)
            .then(() => {
                const newCards = savedCards.filter((c) => c._id !== card._id)
                setSavedCards(newCards);
                localStorage.setItem('savedMovies', JSON.stringify(newCards));
                console.log("Карточка удалена");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function saveCard(card) {
        saveMovie(card)
            .then((data) => {
                localStorage.setItem('savedMovies', JSON.stringify(data));
                console.log("карточка сохранена")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <section className="search">
                <form className='search__form' onSubmit={locationMovies ? handleSubmitMovies : handleSubmitSavedMovies}>
                    <input className="search__input" type="text" value={searchText} onChange={handleChange} placeholder="Фильм" />
                    <button className="search__button" type='submit'>Найти</button>
                </form>
                <FilterCheckbox isShortMovies={isShortMovies} setIsShortMovies={setIsShortMovies} />
            </section>
            <section className='content'>
                {errorMessage && <span className="content__error-message">{errorMessage}</span>}
                {preloader && <Preloader />}
                {!preloader && !errorMessage && (<MoviesCardList cardsList={movies} savedMovies={savedMovies} deleteCard={deleteCard} saveCard={saveCard}/>)}
            </section>
            {displayedMovies <= filteredShortMovies.length && !errorMessage ?
                (<section className="more">
                    <button className="more__button" type='button' onClick={moreMovies}>Еще</button>
                </section>) : (
                    <div className='more-space'></div>
                )
            }
        </>
    );
}

export default SearchForm;