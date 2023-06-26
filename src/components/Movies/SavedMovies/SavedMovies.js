import Header from '../../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../../Footer/Footer'
import { savedMoviesList } from '../../../utils/constants'


function SavedMovies() {
  return (
    <>
      <Header moviesClassName='header__nav-item' savedMoviesClassName='header__active-link' className={"header header-movies"} />
      <main className='main'>
        <SearchForm cardsList={savedMoviesList} className='element__button-delete' />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;