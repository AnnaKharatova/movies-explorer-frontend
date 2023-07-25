import { Link } from 'react-router-dom'
import AuthForm from '../AuthForm/AuthForm'

function Register(props) {

    return (
        <AuthForm
            {...props}
            title='Добро пожаловать!'
            button={''}
        >
            <p className="auth__caption">Уже зарегистрированы?&#8194;
                <Link to='/signin' className="auth__caption-link">Войти</Link>
            </p>
        </AuthForm >

    );
}
export default Register;