import Header from '../../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../../Footer/Footer'

function SavedMovies({isLogged, savedMovies, setSavedMovies, allMovies}) {

  return (
    <>
      <Header moviesClassName='header__nav-item' savedMoviesClassName='header__active-link' className={"header header-movies"} isLogged={isLogged}/>
      <main className='main'>
        <SearchForm savedMovies={savedMovies} setSavedMovies={setSavedMovies} allMovies={allMovies}/>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;