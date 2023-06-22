import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__content">
                <p className="footer__copyright">© 2023</p>
                <ul className="footer__items">
                    <li className="footer__caption">Яндекс.Практикум</li>
                    <li className="footer__caption">Github</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;