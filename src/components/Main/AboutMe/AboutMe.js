import './AboutMe.css';
import photo from '../../../images/1637795370_53-koshka-top-p-portret-kota-56.jpg'

function AboutMe() {
    return (
        <section className="student">
            <h2 className="section__title">Студент</h2>
            <div className="student__info">
                <img className="student__photo" src={photo} alt="Фото студента" />
                <h3 className="student__name">Виталий</h3>
                <p className="student__subtitle">Фронтенд-разработчик, 30 лет</p>
                <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
                    «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
                    постоянной работы.</p>
                <a className="student__link" href="https://github.com" target='blank'>Github</a>
            </div>
        </section>
    );
}

export default AboutMe;