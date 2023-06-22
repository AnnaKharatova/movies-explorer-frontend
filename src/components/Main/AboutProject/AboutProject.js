import './AboutProject.css';

function AboutProject() {
    return (
        <section className="project">
            <h2 id="aboutProject" className="section__title">О проекте</h2>
            <div className="project__description">
                <h3 className="project__title title-stages">Дипломный проект включал 5 этапов</h3>
                <p className="project__text text-stage">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
                    финальные доработки.</p>
                <h3 className="project__title title-weeks">На выполнение диплома ушло 5 недель</h3>
                <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
                    успешно защититься.</p>
            </div>
            <div className="project__table">
                <p className="project__column-min">1 неделя</p>
                <p className="project__column-max">4 недели</p>
                <p className="project__row">Back-end</p>
                <p  className="project__row">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;