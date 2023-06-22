import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import {cardsList} from '../../utils/constants'

function Movies() {
  return (
    <>
        <Header moviesClassName='header__nav-item_active' savedMoviesClassName='header__nav-item'/>
        <SearchForm cardsList={cardsList} className='element__button'/>
        <Footer />
    </>
  );
};

export default Movies;