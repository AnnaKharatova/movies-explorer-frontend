import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import { cardsList } from '../../utils/constants'

function Movies() {
  return (
    <>
      <Header moviesClassName='header__active-link' savedMoviesClassName='header__nav-item' className={"header header-movies"} />
      <main className='main'>
        <SearchForm cardsList={cardsList} className='element__button' />
        <Footer />
      </main>
    </>
  );
};

export default Movies;