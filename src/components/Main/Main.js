import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer'
import Header from '../Header/Header';


  function Main({isLogged}) {
  return (
    <>
      <Header className={"header header-main"} isLogged={isLogged} moviesClassName='header__nav-item' savedMoviesClassName='header__active-link' />
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;