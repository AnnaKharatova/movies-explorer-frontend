import './Profile.css'
import React, { useState } from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        navigate('/movies');
    }

    function handleLogOut() {
        navigate('/')
    }
    return (
        <>
            <Header moviesClassName='header__nav-item' savedMoviesClassName='header__nav-item' className={"header header-movies"} />
            <main className='main'>
                <section className="profile">
                    <h1 className="profile__title">Привет, Анна!</h1>
                    <form className='profile__form' onSubmit={handleSubmit}>
                        <div className='profile__form-input'>
                            <label className='profile__label'>Имя</label>
                            <input className="profile__input" defaultValue='Анна' required disabled={!isEditing} />
                        </div>
                        <div className='profile__form-input'>
                            <label className='profile__label'>E-mail</label>
                            <input className="profile__input" required defaultValue='pochta@yandex.ru' disabled={!isEditing} />
                        </div>
                        {isEditing ? (
                            <>
                                <span className="profile__error"></span>
                                <button className="profile__submit-button" type="submit">Сохранить</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleEditClick} className="profile__update-button" type="button">Редактировать</button>
                                <button onClick={handleLogOut} className="profile__signout-button" type="button">Выйти из аккаунта</button>
                            </>
                        )}

                    </form>
                </section>
            </main>
        </>
    );
}
export default Profile;