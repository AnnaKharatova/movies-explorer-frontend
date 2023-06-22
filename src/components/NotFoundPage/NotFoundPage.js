import './NotFoundPage.css'


function NotFoundPage() {
    return (
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__caption">Страница не найдена</p>
            <button className="not-found__button">Назад</button>
        </main>
    );
};

export default NotFoundPage;