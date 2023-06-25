import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm/AuthForm'


function Login() {

    return (
        <AuthForm
            title='Рады видеть!'
            button={<button className='auth__submit-button auth-login' type='submit'>Войти</button>}
        >
            <p className="auth__caption">Вы не зарегистрированы?&#8194;
                <Link to='/signup' className="auth__caption-link">Регистрация</Link>
            </p>
        </AuthForm >
    );
}
export default Login;