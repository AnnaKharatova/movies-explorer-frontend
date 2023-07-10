import { BASE_URL } from '../utils/constants'

const checkResponse = (res) => {
  if (res.ok) { return res.json() }
  return Promise.reject(res.status);
};

/* user */

export const register = (name, email, password) => {
  return fetch(`https://api.movies-express.nomoredomains.rocks/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password, email })
  }).then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`https://api.movies-express.nomoredomains.rocks/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse)
};

export const fetchUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    }
  })
    .then(checkResponse)
    .then((res) => res)
}

export const updateUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  }).then(checkResponse)
    .then((res) => res)
}

/* movies */

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
  }).then(checkResponse)
};

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: movie.country ? movie.country : "Страна не указана",
      director: movie.director ? movie.director : "Режиссер не указан",
      duration: movie.duration,
      year: movie.year ? movie.year : "Год не указан",
      description: movie.description ? movie.description : "Описание не указано",
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink ? movie.trailerLink : "Трейлер отсутствует",
      nameRU: movie.nameRU ? movie.nameRU : "Название на русском языке не указано",
      nameEN: movie.nameEN ? movie.nameEN : "Назввание на английском языке не указано",
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      owner: movie.owner
    }),
  }).then(checkResponse)
  .then((res) => res);
}

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
    },
  })
    .then(checkResponse);
}


