import './Header.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import PopupMenu from '../PopupMenu/PopupMenu'

function Header(props) {

    const [showPopup, setShowPopup] = useState(false);

    function togglePopup() {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <header className="header__main">
                <div className="header__logo">
                    <Link to="/">
                        <img className="header__logo-img" src={logo} alt="Логотип" />
                    </Link>
                    <button onClick={togglePopup} className="header__burger-menu">
                        <hr className="header__element" />
                        <hr className="header__element" />
                        <hr className="header__element" />
                    </button>
                    <ul className='header__nav'>
                        <li>
                            <Link to="/movies" className={props.moviesClassName}>
                                Фильмы
                            </Link>
                        </li>
                        <li>
                            <Link to="/saved-movies" className={props.savedMoviesClassName}>
                                Сохраненные фильмы
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/profile">
                    <button className="header__account-button">
                        <p className="header__account-text">Аккаунт</p>
                    </button>
                </Link>
                {showPopup && <PopupMenu onClose={togglePopup} />}
            </header>
        </>
    );
};

export default Header;