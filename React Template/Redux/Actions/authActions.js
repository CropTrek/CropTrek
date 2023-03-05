import axios from "axios";
import jwt_decode from 'jwt-decode';
import { setAuth } from "../../Utils/setAuth";
import { ERRORS, SET_USER } from "../Types";

                /*******************************************LOGIN ACTION*******************************************/
export const LoginAction = (form, navigate) => dispatch =>{
    axios.post('/auth/login', form)
    .then(res=>{
        const token = res.data
        localStorage.setItem('jwt', token)
        const decode = jwt_decode(token)
        dispatch(setUser(decode))
        setAuth(token)
    })
    .catch(err=>{
        dispatch({
            type : ERRORS,
            payload : err.response.data
        })
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