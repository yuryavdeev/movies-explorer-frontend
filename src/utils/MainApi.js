// const apiURL = 'https://api.avdeev.movies.nomoredomains.monster';
const apiURL = 'http://localhost:3000';

const checkResponse = (res) => {
    return res.ok ?
        res.json()
        :
        Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
}

export const register = async ({ name, email, password }) => {
    console.log(`роут /signup`) //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const res = await fetch(`${apiURL}/signup`, {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });
    return checkResponse(res);
}

export const authorize = async ({ email, password }) => {
    console.log(`роут /signin`) //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const res = await fetch(`${apiURL}/signin`, {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    return checkResponse(res);
}

export const deleteAuth = async () => {
    console.log('роут /signout') //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const res = await fetch(`${apiURL}/signout`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return checkResponse(res);
}


export const getUser = async () => {
    console.log('роут /users/me') //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const res = await fetch(`${apiURL}/users/me`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return checkResponse(res)
}

export const updateUser = async ({ name, email }) => {
    console.log('роут /users/me') //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const res = await fetch(`${apiURL}/users/me`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
    return checkResponse(res)
}

export const addToMyMoviesList = async (movie) => {
    const res = await fetch(`${apiURL}/movies`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            trailerLink: movie.trailerLink,
            id: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            image: movie.image.url ?
                `https://api.nomoreparties.co${movie.image.url}`
                :
                movie.image,
            thumbnail: !movie.thumbnail ?
                `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
                :
                movie.thumbnail,
        })
    })
    return checkResponse(res)
}

export const getMyMovies = async () => {
    const res = await fetch(`${apiURL}/movies`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return checkResponse(res)
}

export const deleteFromMyMoviesList = async (_id) => {
    const res = await fetch(`${apiURL}/movies/${_id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return checkResponse(res)
}
