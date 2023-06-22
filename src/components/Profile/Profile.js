import './Profile.css'
import Header from '../Header/Header'

function Profile() {
    return (
        <>
            <Header moviesClassName='header__nav-item' savedMoviesClassName='header__nav-item' />
            <section className="profile">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <form className='profile__form'>
                    <div className='profile__form-input'>
                        <label className='profile__label'>Имя</label>
                        <input className="profile__input" defaultValue='Виталий' required />
                    </div>
                    <div className='profile__form-input'>
                        <label className='profile__label'>E-mail</label>
                        <input className="profile__input" required defaultValue='pochta@yandex.ru' />
                    </div>
                    <span className="profile__error"></span>
                    <button className="profile__update-button" type="submit">Редактировать</button>
                    <button className="profile__signout-button" type="button">Выйти из аккаунта</button>
                </form>
            </section>
        </>
    );
}
export default Profile;