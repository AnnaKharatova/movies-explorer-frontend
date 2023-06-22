import './Register.css'
import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm/AuthForm'

function Register() {
    const inputName =
        <>
            <label className='auth__label' for="email">Имя</label>
            <input className='auth__input' type='text' id="name" name="name" required></input>
            <span className='auth__input-error'></span>
        </>
    return (
        <AuthForm
            title='Добро пожаловать!'
            button={<button className='register__submit-button' type='submit'>Зарегистрироваться</button>}

            input={inputName}
        >
            <p className="register__caption">Уже зарегистрированы?&#8194;
                <Link to='/signin' className="register__caption-link">Войти</Link>
            </p>
        </AuthForm >

    );
}
export default Register;