import { combineReducers } from 'redux'
import {USERNAME_CHANGE} from '../action/actionTypes'

const fromState = {
    username:''
}

export const fromReducer = (state=fromState, action)=>{
    switch(action.type){
        case USERNAME_CHANGE:
        return {...state,username:action.value}
        default:
        return state
    }
}

export default combineReducers({
    fromReducer
})