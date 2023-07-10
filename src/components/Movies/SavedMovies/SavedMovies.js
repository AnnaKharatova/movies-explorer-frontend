import { useState, useEffect } from 'react';
import Header from '../../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../../Footer/Footer'

function SavedMovies({ isLogged, savedMovies, setSavedMovies }) {

  const [isShortMovies, setIsShortMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState('');
  const [savedCardsList, setSavedCardsList] = useState([])

  useEffect(() => {
    const savedQuery = localStorage.getItem('savedSearchText');
    const storageMovies = localStorage.getItem('savedMoviesData');
    const storedIsShortMovies = localStorage.getItem('savedIsShortMovies');
    if (savedQuery) {
      setSearchText(savedQuery);
    }
    if (storageMovies) {
      setSavedCardsList(JSON.parse(storageMovies));
    }
    if (storedIsShortMovies) {
      setIsShortMovies(storedIsShortMovies === 'true');
    }
  }, [])

  function handleSearch() {
    if (searchText.trim() === '') {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setErrorMessage('');
    localStorage.setItem('savedSearchText', searchText);
    const filteredMovies = savedMovies.filter(card => card.nameRU.toLowerCase().includes(searchText));
    const filteredShortMovies = isShortMovies ? filteredMovies.filter((film) => film.duration <= 40) : filteredMovies;
    setSavedCardsList(filteredShortMovies)
    localStorage.setItem('savedMoviesData', JSON.stringify(filteredShortMovies));

    if (filteredShortMovies.length === 0) {
      setErrorMessage("Ничего не найдено")
    }
  }
  function onChange() {
    setErrorMessage('')
  }

  return (
    <>
      <Header moviesClassName='header__nav-item' savedMoviesClassName='header__active-link' className={"header header-movies"} isLogged={isLogged} />
      <main className='main'>
        <SearchForm
          onSubmit={handleSearch}
          cardsList={savedCardsList}
          onChange={onChange}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          errorMessage={errorMessage}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          searchText={searchText}
          setSearchText={setSearchText}
          setSavedCardsList={setSavedCardsList}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;