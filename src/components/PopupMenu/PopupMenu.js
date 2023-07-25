import './PopupMenu.css'
import { Link, NavLink } from 'react-router-dom';

function PopupMenu({ onClose }) {

    return (
        <section className='popup-menu' id="popup-menu">
            <div className="popup-menu__container">
                <div className="popup-menu__body">
                    <button onClick={onClose} className="popup-menu__close-button" type="button" id="popup-menu__close-button"></button>
                    <ul className="popup-menu__nav">
                        <li className='popup-menu__list'>
                            <NavLink to='/' activeclassname='active' className="popup-menu__nav-item">Главная</NavLink>
                        </li>
                        <li className='popup-menu__list'>
                            <NavLink to='/movies' activeclassname='active' className="popup-menu__nav-item">Фильмы</NavLink>
                        </li>
                        <li className='popup-menu__list'>
                            <NavLink to='/saved-movies' activeclassname='active' className="popup-menu__nav-item">Сохраненные фильмы</NavLink>
                        </li>
                    </ul>
                    <Link to='/profile' onClick={onClose} className="header__account popup-menu-account">Аккаунт</Link>
                </div>
            </div>
        </section>
    );
};

export default PopupMenu;