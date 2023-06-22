import './Login.css'
import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm/AuthForm'

function Login() {
    const button =<button className='login__submit-button' type='submit'>Войти</button>
    return (
        <AuthForm
            title='Рады видеть!'
            button={button}
        >
            <p className="login__caption">Вы не зарегистрированы?&#8194;
                <Link to='/signup' className="login__caption-link">Регистрация</Link>
            </p>
        </AuthForm >
    );
}
export default Login;