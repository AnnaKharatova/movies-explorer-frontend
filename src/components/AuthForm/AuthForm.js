import './AuthForm.css'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function AuthForm(props) {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        navigate('/movies');
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
                    <form className='auth__form' onSubmit={handleSubmit}>
                        {props.input}
                        <label className='auth__label' htmlFor="email">E-mail</label>
                        <input className='auth__input' type='email' id="email" name="email" placeholder='Введите email' required></input>
                        <span className='auth__input-error'></span>
                        <label className='auth__label' htmlFor="password">Пароль</label>
                        <input className='auth__input input-password' type='password' id="password" name="password" placeholder='Введите пароль' required></input>
                        <span className='auth__input-error'></span>
                        <span className='auth__input-error'></span>
                        {props.button}
                    </form>
                    {props.children}
                </section>
            </main >
        </>
    );
}
export default AuthForm;