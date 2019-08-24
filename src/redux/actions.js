//here we create actions
import {CHANGE_LOGIN_FIELD, CHANGE_USER} from './constants'

const setLogin = (status) => ({
    type: CHANGE_LOGIN_FIELD,
    payload: status
})

const setUser = (user) => ({
    type: CHANGE_USER,
    payload: user
})


export{
    setLogin,
    setUser
}