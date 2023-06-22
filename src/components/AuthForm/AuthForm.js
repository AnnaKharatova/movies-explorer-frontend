import './AuthForm.css'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'

function AuthForm(props) {
    return (
        <>
            <header className='auth__header'>
                <Link to='/'>
                    <img className='auth__logo-img' src={logo} alt="Логотип" />
                </Link>
                <h1 className='auth__title'>{props.title}</h1>
            </header>
            <main className='auth'>
                <form className='auth__form'>
                    {props.input}
                    <label className='auth__label' for="email">E-mail</label>
                    <input className='auth__input' type='email' id="email" name="email" required></input>
                    <span className='auth__input-error'></span>
                    <label className='auth__label' for="password">Пароль</label>
                    <input className='auth__input input-password' type='password' id="password" name="password" required></input>
                    <span className='auth__input-error'></span>
                    <span className='auth__input-error'></span>
                    {props.button}
                </form>
                {props.children}
            </main>
        </>
    );
}
export default AuthForm;