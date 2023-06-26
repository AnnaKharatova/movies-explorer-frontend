import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm/AuthForm'

function Register() {
    const inputName =
        <>
            <label className='auth__label' htmlFor="email">Имя</label>
            <input className='auth__input' type='text' id="name" name="name" placeholder='Введите ваше имя' required></input>
            <span className='auth__input-error'></span>
        </>
    return (
        <AuthForm
            title='Добро пожаловать!'
            button={<button className='auth__submit-button' type='submit'>Зарегистрироваться</button>}

            input={inputName}
        >
            <p className="auth__caption">Уже зарегистрированы?&#8194;
                <Link to='/signin' className="auth__caption-link">Войти</Link>
            </p>
        </AuthForm >

    );
}
export default Register;