import  axios  from 'axios';
import {USER_LIST_REQUEST, USER_LIST_FAIL, USER_LIST_SUCCESS} from '../Constants/UserConstant.js';
// List Users

export const listUsers= ()=>async (dispatch) => {
    try {
        dispatch({type:USER_LIST_REQUEST});
        const {data}=await axios.get('http://localhost:5000/api/users');
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        dispatch({type:USER_LIST_SUCCESS,payload:data});


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message :
            error.message
            
            
        })
    }
}




export default listUsers;

