import axios from "axios";
import jwt_decode from 'jwt-decode';
import { setAuth } from "../../Utils/setAuth";
import { ERRORS, SET_USER } from "../Types";

                /*******************************************LOGIN ACTION*******************************************/
export const LoginAction = (form) => dispatch =>{
    axios.post('localhost:5000/auth/login', form)
    .then(res=>{
        const token = res.data
        console.log(token);
        localStorage.setItem('jwt', token)
        const decode = jwt_decode(token)
        dispatch(setUser(decode))
        setAuth(token)
    })
    .catch(err=>{
        console.log("error");
    })
}


                /*******************************************LOGOUT ACTION*******************************************/
export const logout = () => dispatch => {
    localStorage.removeItem('jwt')
    dispatch({
        type : ERRORS,
        payload : {}
    })
}           





export const setUser = (decode)=>({
    type: SET_USER,
    payload: decode
})