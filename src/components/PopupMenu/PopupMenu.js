import './PopupMenu.css'
import { Link, NavLink } from 'react-router-dom';

function PopupMenu({ onClose }) {

    return (
        <section className='popup' id="popup-menu">
            <div className="popup__container">
                <div className="popup__body">
                    <button onClick={onClose} className="popup__close-button" type="button" id="popup-menu__close-button"></button>
                    <ul className="popup__nav">
                        <li className='popup__list'>
                            <NavLink to='/' activeclassname='active' className="popup__nav-item">Главная</NavLink>
                        </li>
                        <li className='popup__list'>
                            <NavLink to='/movies' activeclassname='active' className="popup__nav-item">Фильмы</NavLink>
                        </li>
                        <li className='popup__list'>
                            <NavLink to='/saved-movies' activeclassname='active' className="popup__nav-item">Сохраненные фильмы</NavLink>
                        </li>
                    </ul>
                    <Link to="/profile" className="header__account popup-account">Аккаунт</Link>
                </div>
            </div>
        </section>
    );
};

export default PopupMenu;