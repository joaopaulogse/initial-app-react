import {database} from '../services/firebase'
const INITIAL_STATE = { nome:'', email:'' }

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case 'CHANGED':
            return { ...state, [action.name]: action.payload }
        default:
            return state
    }
}