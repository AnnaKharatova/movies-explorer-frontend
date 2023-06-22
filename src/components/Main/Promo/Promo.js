import './Promo.css';
import logo from '../../../images/logo.svg';
import earth from '../../../images/landing-logo.svg';
import { Link } from 'react-router-dom'

function Promo() {

  return (
    <div className='promo'>
      <div className="promo__logo">
        <img className="promo__logo-img" src={logo} alt="Логотип"></img>
        <ul className="promo__sing-buttons">
          <li>
            <Link to='/signup'>
              <button className="promo__sing">Регистрация</button>
            </Link>
          </li>
          <li>
            <Link to='/signin'>
              <button className="promo__sing">Войти</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="promo__content">
        <img className="promo__picture" src={earth} alt="Изображние земного шара из слов web"></img>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <a className="promo__link" href="#aboutProject">Узнать больше</a>
    </div>
  );
}

export default Promo;