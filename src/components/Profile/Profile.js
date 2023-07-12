import './Profile.css'
import React, { useState, useContext, useRef, useEffect } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import { updateUserInfo } from '../../utils/MainApi'

function Profile({ isLogged, handleLogOut }) {
    const { values, handleChange, errors, isValid, setErrors,} = useFormAndValidation();
    const currentUser = useContext(CurrentUserContext);
    let initialState = useRef(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(currentUser.name)
    const [disableButton, setDisableButton] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (initialState.current) {
            initialState.current = false;
        } else if (values.name && values.email) {
            if ((values.name.value !== currentUser.name || values.email.value !== currentUser.email) && isValid) {
                setDisableButton(false);
                setErrors('')
                setError('')
            } else {
                setDisableButton(true);
            }
        }
    }, [currentUser, values, isValid, setErrors]);

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
                                value={values.name || ''}
                                placeholder={currentUser.name}
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
                                value={values.email || ""}
                                onChange={handleChange}
                                required
                                placeholder={currentUser.email}
                                disabled={!isEditing} />
                        </div>
                        {isEditing ? (
                            <>
                                <span className="profile__error">{errors.name}{errors.email}{error}</span>
                                <button className="profile__submit-button" type="submit" disabled={disableButton || !isValid}>Сохранить</button>
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