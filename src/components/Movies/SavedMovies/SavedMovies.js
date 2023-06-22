import Header from '../../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../../Footer/Footer'
import { savedMoviesList } from '../../../utils/constants'


function SavedMovies() {
  return (
    <>
      <Header moviesClassName='header__nav-item' savedMoviesClassName='header__nav-item_active' />
        <SearchForm cardsList={savedMoviesList} className='element__button-delete' />
      <Footer />
    </>
  );
}

export default SavedMovies;