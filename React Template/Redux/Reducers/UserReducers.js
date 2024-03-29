import {USER_LIST_SUCCESS, USER_LIST_REQUEST, USER_LIST_FAIL} from '../Constants/UserConstant'

export const USER_LIST_Reducer = (state={ users:[]},action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true,users:[]};
        case USER_LIST_SUCCESS:
            return {loading: false,users:action.payload};
        case USER_LIST_FAIL:
            return {loading: false,error:action.payload};
                
        default:
            return state
    }
}



