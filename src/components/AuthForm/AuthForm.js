import './AuthForm.css';
import React from 'react';
import logo from '../../images/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AuthForm(props) {
    const location = useLocation();
    const locationSingup = location.pathname.endsWith('/signup')
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    function handleSubmitRegister(evt) {
        evt.preventDefault();
        const { name, email, password } = values;
        if (isValid) {
            props.onRegister(name, email, password);
            resetForm()
        }
    }

    function handleSubmitLogin(e) {
        e.preventDefault();
        const { email, password } = values;
        if (isValid) {
            props.onLogin(email, password);
            resetForm()
        }
    }
    return (
        <>
            <main className='main'>
                <section className='auth'>
                    <div className='auth__header'>
                        <Link to='/'>
                            <img className='auth__logo-img' src={logo} alt="Логотип" />
                        </Link>
                        <h1 className='auth__title'>{props.title}</h1>
                    </div>
                    <form className='auth__form' onSubmit={locationSingup ? handleSubmitRegister : handleSubmitLogin} noValidate>
                        {locationSingup ? (
                            <>
                                <label className='auth__label' htmlFor="email">Имя</label>
                                <input
                                    className='auth__input'
                                    type='text'
                                    id="name"
                                    name='name'
                                    minLength={2}
                                    maxLength={30}
                                    placeholder='Введите ваше имя'
                                    value={values.name || ""}
                                    onChange={handleChange}
                                    required></input>
                                <span className='auth__input-error'>{errors.name}</span>
                            </>
                        ) : ("")}

                        <label className='auth__label' htmlFor="email">E-mail</label>
                        <input
                            className='auth__input'
                            type='email'
                            id="email"
                            name="email"
                            placeholder='Введите email'
                            value={values.email || ""}
                            onChange={handleChange}
                            autoComplete="email"
                            required></input>
                        <span className='auth__input-error'>{errors.email}</span>

                        <label className='auth__label' htmlFor="password">Пароль</label>
                        <input
                            className='auth__input input-password'
                            type='password'
                            id="password"
                            name="password"
                            placeholder='Введите пароль'
                            minLength={2}
                            value={values.password || ""}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required></input>
                        <span className='auth__input-error'>{errors.password}</span>
                        <span className='auth__input-error submit-error'>{props.error}</span>
                        {locationSingup ? (<button className={!isValid ? "auth__submit-button_disabled" : "auth__submit-button"} type='submit' disabled={!isValid}>Зарегистрироваться</button>)
                            : (<button className={!isValid ? "auth__submit-button_disabled" : "auth__submit-button"} type='submit' disabled={!isValid}>Войти</button>)}
                    </form>
                    {props.children}
                </section>
            </main >
        </>
    );
}
export default AuthForm;