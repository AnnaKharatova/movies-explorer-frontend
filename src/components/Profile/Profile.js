import './Profile.css'
import React, { useState, useContext, useRef, useEffect } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import { updateUserInfo } from '../../utils/MainApi'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

function Profile({ isLogged, handleLogOut }) {
    const { values, handleChange, errors, isValid, setErrors,} = useFormAndValidation();
    const currentUser = useContext(CurrentUserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(currentUser.name)
    const [activeButton, setActiveButton] = useState(false)
    const [error, setError] = useState("")
    const [isPopupErrorOpen, setIsPopupErrorOpen] = useState(false)
    const [popupMessage, setPopupMessage] = useState(false)

    console.log(currentUser.email)

    useEffect(() => {
            if ((values.name !== currentUser.name || values.email !== currentUser.email)){
                console.log('!==')
                setActiveButton(true)

            } else {
                console.log('===')
                setActiveButton(false)
            }
    }, [currentUser, values, isEditing]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { name, email } = values;
        if (isValid) {
            updateProfile(name, email);
        }
        console.log('Данные пользователя обновленны')
    }

    function updateProfile(name, email) {
        updateUserInfo(name, email)
            .then((res) => {
                currentUser.name = res.name;
                currentUser.email = res.email;
                currentUser.id = res._id;
                setCurrentName(res.name)
                setIsPopupErrorOpen(true)
                setPopupMessage('Обновление данных прошло успешно')
            })
            .catch((res) => {
                if (res === 409) {
                    setError("Пользователь с таким email уже существует.")
                } else if (res === 500) {
                    setError("На сервере произошла ошибка.")
                } else {
                    setError("При обновлении профиля произошла ошибка.")
                }
            })
            .finally(setIsEditing(false))
    }

    return (
        <>
            <Header moviesClassName='header__nav-item' savedMoviesClassName='header__nav-item' className={"header header-movies"} isLogged={isLogged} />
            <main className='main'>
                <section className="profile">
                    <h1 className="profile__title">Привет, {currentName || currentUser.name}</h1>
                    <form className='profile__form' onSubmit={handleSubmit}>
                        <div className='profile__form-input'>
                            <label className='profile__label'>Имя</label>
                            <input className="profile__input"
                                type='text'
                                id="name"
                                name='name'
                                minLength={2}
                                maxLength={30}
                                value={values.name = values.name || currentUser.name || ''}
                                onChange={handleChange}
                                required
                                disabled={!isEditing} />
                        </div>
                        <div className='profile__form-input'>
                            <label className='profile__label'>E-mail</label>
                            <input className="profile__input"
                                type='email'
                                id="email"
                                name="email"
                                value={values.email = values.email || currentUser.email || ''}
                                onChange={handleChange}
                                required
                                disabled={!isEditing} />
                        </div>
                        <span className="profile__error">{errors.name}{errors.email}{error}</span>
                        {isEditing ? (
                                <button className="profile__submit-button" type="submit" disabled={!activeButton || !isValid}>Сохранить</button>
                        ) : (
                            <>
                                <button onClick={handleEditClick} className="profile__update-button" type="button">Редактировать</button>
                                <button onClick={handleLogOut} className="profile__signout-button" type="button">Выйти из аккаунта</button>
                            </>
                        )}

                    </form>
                </section>
            </main>
            <ErrorPopup popupError={popupMessage} setIsPopupErrorOpen={setIsPopupErrorOpen} isPopupErrorOpen={isPopupErrorOpen} />
        </>
    );
}
export default Profile;