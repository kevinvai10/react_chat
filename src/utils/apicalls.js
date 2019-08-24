import {
    registerUrl,
    signinUrl,
} from './routes';
//--------------------------------------------------
                    //GET REQUESTS
//--------------------------------------------------

//--------------------------------------------------
                    //POST REQUESTS
//--------------------------------------------------
const register = (data) => {
    return fetch(registerUrl , {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'user_id': sessionStorage.getItem('user_id')
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
}

const signIn = (data) => {
    return fetch(signinUrl , {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
}
//--------------------------------------------------
                    //PUT REQUESTS
//--------------------------------------------------

//--------------------------------------------------
                    //DELETE REQUESTS
//--------------------------------------------------


export {
    register,
    signIn,
}