import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className="portfolio__items">
                <li>
                    <a className="portfolio__item item-first" href="https://annakharatova.github.io/how-to-learn/index.html" target='blank'>
                        <p className="portfolio__item-title" >Статичный сайт</p>
                        <span className="portfolio__item-link ">&#8599;</span>
                    </a>
                </li>
                <li>
                    <a className="portfolio__item" href="https://annakharatova.github.io/russian-travel/index.html" target='blank'>
                        <p className="portfolio__item-title" >Адаптивный сайт</p>
                        <span className="portfolio__item-link ">&#8599;</span>
                    </a>
                </li>
                <li>
                    <a className="portfolio__item item-third" href="https://github.com/AnnaKharatova/react-mesto-api-full-gha" target='blank'>
                        <p className="portfolio__item-title" >Одностраничное приложение</p>
                        <span className="portfolio__item-link ">&#8599;</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;