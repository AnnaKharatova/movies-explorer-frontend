import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <ul className="portfolio__items">
                Портфолио
                <li>
                    <a className="portfolio__item item-first" href="https://github.com" target='blank'>
                        <p className="portfolio__item-title" >Статичный сайт</p>
                        <span className="portfolio__item-link ">&#8599;</span>
                    </a>
                </li>
                <li>
                    <a className="portfolio__item" href="https://github.com" target='blank'>
                        <p className="portfolio__item-title" >Адаптивный сайт</p>
                        <span className="portfolio__item-link ">&#8599;</span>
                    </a>
                </li>
                <li>
                    <a className="portfolio__item item-third" href="https://github.com" target='blank'>
                        <p className="portfolio__item-title" >Одностраничное приложение</p>
                        <span className="portfolio__item-link ">&#8599;</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;