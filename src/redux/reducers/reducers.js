import {CHANGE_LOGIN_FIELD, CHANGE_USER} from '../constants'

const initialState = {
    loginStatus: false,
    user: {}
}

export const setLoginStatus = (state=initialState, action={}) => {
    switch(action.type){
        case CHANGE_LOGIN_FIELD:
            return Object.assign({}, state , {loginStatus: action.payload})
        default:
            return state;    
    }
}

export const setUserList = (state=initialState, action={}) => {
    switch(action.type){
        case CHANGE_USER:
            return Object.assign({}, state , {user: action.payload})
        default:
            return state;    
    }
}