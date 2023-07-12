import { useState, useEffect } from 'react'
import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import { useWindowResize } from '../../hooks/useWindowResize'
import api from '../../utils/MoviesApi'

function Movies({ isLogged, savedMovies, setSavedMovies }) {
  const { cardsPerRow, loadMoreCount } = useWindowResize()
  const [cards, setCards] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState('');
  const [displayedCards, setDisplayedCards] = useState(cardsPerRow)


  useEffect(() => {
    setDisplayedCards(cardsPerRow)
  }, [cardsPerRow])

  useEffect(() => {
    const query = localStorage.getItem('moviesSearchText');
    const storageMovies = localStorage.getItem(`moviesCards`);
    const storedIsShortMovies = localStorage.getItem('moviesIsShortMovies');
    if (query) {
      setSearchText(query);
    }
    if (storageMovies) {
      setCards(JSON.parse(storageMovies));

    }
    if (storedIsShortMovies) {
      setIsShortMovies(storedIsShortMovies === 'true');
    }
  }, []);

  function handleSearch() {
    if (searchText.trim() === '') {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setPreloader(true)
    setErrorMessage('');
    localStorage.setItem('moviesSearchText', searchText);
    api.getAllMovies()
      .then((data) => {
        const filteredMovies = data.filter(card => card.nameRU.toLowerCase().includes(searchText));
        const filteredShortMovies = isShortMovies ? filteredMovies.filter((film) => film.duration <= 40) : filteredMovies;
        setCards(filteredShortMovies)
        localStorage.setItem(`moviesCards`, JSON.stringify(filteredShortMovies));
        if (filteredShortMovies.length === 0) {
          setErrorMessage("Ничего не найдено")
        }
      })
      .catch(() => {
        setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setPreloader(false))
  };

  function moreMovies() {
    setDisplayedCards(displayedCards + loadMoreCount)
  }

  function onChange() {
    setErrorMessage('')
  }

  return (
    <>
      <Header moviesClassName='header__active-link' savedMoviesClassName='header__nav-item' className={"header header-movies"} isLogged={isLogged} />
      <main className='main'>
        <SearchForm
          preloader={preloader}
          onSubmit={handleSearch}
          cardsList={cards.slice(0, displayedCards)}
          onChange={onChange}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          errorMessage={errorMessage}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          searchText={searchText}
          setSearchText={setSearchText}
          setErrorMessage={setErrorMessage}
        />
        {cards.length > displayedCards ? (
          <section className="more">
            <button className="more__button" type='button' onClick={moreMovies}>Еще</button>
          </section>) : ('')}
        <Footer />
      </main>
    </>
  );
};

export default Movies;