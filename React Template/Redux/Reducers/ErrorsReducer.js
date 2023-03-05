import { ERRORS } from "../Types"


const initialState = {}
export default function(state = initialState, action){
    switch(action.type){
        case ERRORS : 
        return action.payload
        default :
        return state
    }
}
