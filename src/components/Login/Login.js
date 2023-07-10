import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm/AuthForm'

function Login(props) {

    return (
        <AuthForm
            {...props}
            title='Рады видеть!'
            button={''}
        >
            <p className="auth__caption">Вы не зарегистрированы?&#8194;
                <Link to='/signup' className="auth__caption-link">Регистрация</Link>
            </p>
        </AuthForm >
    );
}
export default Login;