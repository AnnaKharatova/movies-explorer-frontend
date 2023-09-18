import './App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import SavedMovies from '../Movies/SavedMovies/SavedMovies'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { register, authorize, checkToken, fetchUserInfo, getMovies } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const { resetForm } = useFormAndValidation();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', id: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('')
  const [savedMovies, setSavedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [popupError, setPopupError] = useState('')
  const [isPopupErrorOpen, setIsPopupErrorOpen] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      Promise.all([fetchUserInfo(), getMovies()])
        .then(([userInfo, savedMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies)
        })
        .catch((res) => {
          if (res === 500) {
            setIsPopupErrorOpen(true)
            setPopupError('На сервере произошла ошибка')
          } else {
            console.log('Ошибка получения данных пользователя')
            setIsPopupErrorOpen(true)
            setPopupError('Ошибка получения данных пользователя')
          }
        })
    }
  }, [loggedIn]);

  useEffect(() => {
    setIsLoading(true)
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setIsLoading(false)
          }
          console.log('token is OK')
        }).catch((res) => {
          setIsPopupErrorOpen(true)
          setPopupError('При проверке токена произошла ошибка')
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

  function onLogin(email, password) {
    authorize(email, password)
      .then(({ token }) => {
        setLoggedIn(true)
        navigate("/movies")
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
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/movies-explorer-frontend/" element={<Main isLogged={loggedIn} popupError={popupError} setIsPopupErrorOpen={setIsPopupErrorOpen} isPopupErrorOpen={isPopupErrorOpen} />} />
          <Route path="/movies" element={<ProtectedRoute component={Movies} isLoading={isLoading} isLogged={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />} />
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} isLoading={isLoading} isLogged={loggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} isLoading={isLoading} isLogged={loggedIn} handleLogOut={handleLogOut} />} />
          <Route path="/signin" element={<Login onRegister={onRegister} onLogin={onLogin} error={error} />} />
          <Route path="/signup" element={<Register onRegister={onRegister} onLogin={onLogin} error={error} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
