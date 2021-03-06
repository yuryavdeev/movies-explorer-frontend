class MoviesApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
    }

    async getMovies() {
        // console.log('api - getMovies')
        const res = await fetch(`${this._url}`, {
            method: 'GET',
            headers: this._headers
        });
        return this._checkResponse(res);
    }
}

const moviesApi = new MoviesApi // <=  создал экзмепляр
    ({
        url: 'https://api.nomoreparties.co/beatfilm-movies',
        headers: {
            'Content-Type': 'application/json',
        }
    });

export default moviesApi;