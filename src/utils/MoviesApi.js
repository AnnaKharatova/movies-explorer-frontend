
class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getAllMovies() {
        return fetch(`${this._baseUrl}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default api;

