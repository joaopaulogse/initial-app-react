import {database} from '../services/firebase'

export const changeInput = event => {
    // database.ref("change").set({[event.target.name]:event.target.value})
    return {
        type:'CHANGED',
        payload: event.target.value,
        name: event.target.name
    }
}
