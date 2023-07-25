import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer'
import Header from '../Header/Header';
import ErrorPopup from '../ErrorPopup/ErrorPopup'

  function Main({isLogged, popupError, setIsPopupErrorOpen, isPopupErrorOpen}) {
  return (
    <>
      <Header className={"header header-main"} isLogged={isLogged} moviesClassName='header__nav-item' savedMoviesClassName='header__nav-item' />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <ErrorPopup popupError={popupError} setIsPopupErrorOpen={setIsPopupErrorOpen} isPopupErrorOpen={isPopupErrorOpen}/>
      </main>
      <Footer />
    </>
  );
};

export default Main;