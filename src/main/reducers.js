import { combineReducers } from 'redux'
import principalReducer from '../components/principalReducer'
import {reducer as formReducer} from 'redux-form'
const reducers = combineReducers({
    teste: principalReducer,
    form:formReducer
})

export default reducers