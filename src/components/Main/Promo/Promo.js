import './Promo.css';
import earth from '../../../images/landing-logo.png';

function Promo() {

  return (
    <section className='promo'>
      <img className="promo__picture" src={earth} alt="Изображние земного шара из слов web" />
      <div className='promo__content'>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__link" href="#aboutProject">Узнать больше</a>
      </div>

    </section>
  );
}

export default Promo;