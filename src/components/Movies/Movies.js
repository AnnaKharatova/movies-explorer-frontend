import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'

function Movies({isLogged, savedMovies, setSavedMovies, allMovies}) {

 
  return (
    <>
      <Header moviesClassName='header__active-link' savedMoviesClassName='header__nav-item' className={"header header-movies"} isLogged={isLogged}/>
      <main className='main'>
        <SearchForm savedMovies={savedMovies} setSavedMovies={setSavedMovies} allMovies={allMovies}/>
        <Footer />
      </main>
    </>
  );
};

export default Movies;