import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__content">
                <p className="footer__copyright">© 2023</p>
                <ul className="footer__items">
                    <li><a className="footer__caption" href='https://practicum.yandex.ru' target='blank'>Яндекс.Практикум</a></li>
                    <li><a className="footer__caption" href='https://github.com/AnnaKharatova' target='blank'>Github</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;