import './App.css';
import { Route, Routes } from 'react-router-dom';
import SavedMovies from '../Movies/SavedMovies/SavedMovies'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFoundPage from '../NotFoundPage/NotFoundPage';



function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </ Routes>
    </div>
  )
}

export default App;
