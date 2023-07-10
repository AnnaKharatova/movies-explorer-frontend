import './NotFoundPage.css'
import { NavLink } from 'react-router-dom'

function NotFoundPage() {
    return (
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__caption">Страница не найдена</p>
            <NavLink to="/" onClick={() => window.history.back()} className="not-found__back">
                Назад
            </NavLink>
        </main>
    );
};

export default NotFoundPage;