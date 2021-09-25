const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
}

export const register = async ({ name, email, password }) => {
    console.log(`роут /signup + ${ name, email, password }`)
    // const res = await fetch(`.../signup`, {
    //     credentials: "include",
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         email: email,
    //         password: password
    //     })
    // });
    // return checkResponse(res);
}

export const authorize = async ({ email, password }) => {
    console.log(`роут /signin + ${ email, password }`)
    // const res = await fetch(` .../signin`, {
    //     credentials: "include",
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email: email,
    //         password: password
    //     })
    // });
    // return checkResponse(res);
}

export const findMovies = async (queryString) => {
    console.log(`роут /movies + ${queryString}`)
    // const res = await fetch(`.../movies`, {
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         query: queryString,
    //     })
    // })
    // return checkResponse(res)
}

export const getMyMovies = async () => {
    console.log('роут /my/movies')
    // const res = await fetch(`.../my/movies`, {
    //     credentials: 'include',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
    // return checkResponse(res)
}

// export const findInMyMovies = async (queryString) => {
//     console.log(`роут /my/movies + ${queryString}`)
    // const res = await fetch(`.../my/movies`, {
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         query: queryString,
    //     })
    // })
    // return checkResponse(res)
// }


export const deleteAuth = async () => {
    console.log('роут /signout')
    // const res = await fetch(`.../signout`, {
    //     credentials: 'include',
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });
    // return checkResponse(res);
}

export const updateUser = async ({ name, email }) => {
    console.log('роут /me')
    // const res = await fetch(`.../me`, {
    //     credentials: 'include',
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         email: email
    //     })
    // })
    // return checkResponse(res)
}
