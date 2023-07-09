import './App.css';
import { Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState, useContext } from 'react';
import SavedMovies from '../Movies/SavedMovies/SavedMovies'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { register, authorize, checkToken, fetchUserInfo, getMovies } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/MoviesApi';
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const { resetForm } = useFormAndValidation();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('')
  const [savedMovies, setSavedMovies] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const [isTokenChecked, setIsTokenChecked] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      Promise.all([fetchUserInfo(), getMovies(), api.getAllMovies()])
        .then(([userInfo, savedMovies, allMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies)
          setAllMovies(allMovies)
        })
        .catch((res) => {
          if (res === 500) {
            console.log('На сервере произошла ошибка')
          } else {
            console.log('Ошибка получения данных пользователя')
          }
        })
    }
  }, [loggedIn]);

  useEffect(() => {
    setIsTokenChecked(true)
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setIsTokenChecked(false)
            backToPage()
          }
          console.log('token is OK')
        }).catch((res) => {
          console.log('token is not OK ', res)
        })
    }
  }, [loggedIn])


  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('lastVisitedPage', window.location.pathname);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  function onRegister(name, email, password) {
    register(name, email, password)
      .then(() => {
        onLogin(email, password)
      })
      .catch((err) => {
        if (err === 409) {
          setError('Пользователь с таким email уже существует')
        } else if (err === 500) {
          setError('На сервере произошла ошибка')
        } else {
          setError('При регистрации пользователя произошла ошибка')
        }
      })
      .finally(resetForm())
  }

  function backToPage() {
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');
    if (lastVisitedPage) {
      navigate(lastVisitedPage);
    } else {
      navigate('/');
    }

  }

  function onLogin(email, password) {
    authorize(email, password)
      .then(({ token }) => {
        navigate('/')
        setIsTokenChecked(false)
        if (token) {
          localStorage.setItem('jwt', token)
        }
      })
      .catch((err) => {
        if (err === 401) {
          setError('Вы ввели не верный логин или пароль')
        } else if (err === 400) {
          setError('При авторизации произошла ошибка. Переданный токен некорректен')
        } else if (err === 500) {
          setError('На сервере произошла ошибка')
        } else {
          setError('При авторизации произошла ошибка')
        }
      })
      .finally(resetForm())
  }

  function handleLogOut() {
    setLoggedIn(false)
    localStorage.clear();
    navigate('/')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLogged={loggedIn} />} />
          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoading={isTokenChecked} isLogged={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} allMovies={allMovies} />} />
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoading={isTokenChecked} isLogged={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} allMovies={allMovies} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} isLoading={isTokenChecked} isLogged={loggedIn} handleLogOut={handleLogOut} />} />
          <Route path="/signin" element={<Login onRegister={onRegister} onLogin={onLogin} error={error} />} />
          <Route path="/signup" element={<Register onRegister={onRegister} onLogin={onLogin} error={error} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
