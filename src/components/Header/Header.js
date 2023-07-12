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
            <header className={props.className}>
                <Link to="/">
                    <img className="header__logo-img" src={logo} alt="Логотип" />
                </Link>
                {props.isLogged ? (
                    <div className='header__loggedin'>
                        <div onClick={togglePopup} className="header__burger-menu">
                            <hr className="header__element" />
                            <hr className="header__element" />
                            <hr className="header__element" />
                        </div>
                        <nav className='header__nav'>
                            <Link to="/movies" className={props.moviesClassName}>
                                Фильмы
                            </Link>
                            <Link to="/saved-movies" className={props.savedMoviesClassName}>
                                Сохраненные фильмы
                            </Link>
                        </nav>
                        <Link to="/profile" className="header__account">Аккаунт</Link>
                        {showPopup && <PopupMenu onClose={togglePopup} />}
                    </div>
                ) : (
                    <nav className="header__sing">
                        <Link to='/signup' className="header__register">Регистрация</Link>
                        <Link to='/signin' className="header__login">Войти</Link>
                    </nav>
                )}
            </header>
        </>
    );
};

export default Header;