import './AboutMe.css';
import photo from '../../../images/аватар2.jpg'

function AboutMe() {
    return (
        <section className="student">
            <h2 className="section-title">Студент</h2>
            <div className="student__info">
                <img className="student__photo" src={photo} alt="Фото студента" />
                <div className='student__about'>
                    <h3 className="student__name">Анна</h3>
                    <p className="student__subtitle">Фронтенд-разработчик, 38 лет</p>
                    <p className="student__text">Я родилась и живу в Санкт-Петербурге. У меня есть муж
                        и двое детей. Я люблю читать художественную литературу, увлекаюсь йогой, вышиваю крестиком. Недавно начала кодить</p>
                    <a className="student__link" href="'https://github.com/AnnaKharatova" target='blank'>Github</a>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;