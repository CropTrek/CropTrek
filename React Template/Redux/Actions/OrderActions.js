
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from './../Constants/OrderConstants';
import { CART_CLEAR_ITEMS } from '../Constants/CartConstants';
import axios from 'axios'

import { useRouter } from 'next/router';

export const createOrder= (order)=> async (dispatch,getState)=>{


//     const [profileData, setProfileData] = useState({});
// useEffect(() => {
//     const profileString = localStorage.getItem("profile");
//     const profileObject = JSON.parse(profileString);
//     setProfileData(profileObject);
  
  

//     console.log(profileObject)
  
//   }, []);
  
try {

    
dispatch( {type:ORDER_CREATE_REQUEST} );
const token = localStorage.getItem('token');
const config ={
    headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
    },
};
const {data}=await axios.post('http://localhost:5000/api/orders',order,config)
dispatch( {type:ORDER_CREATE_SUCCESS,payload:data} );
dispatch( {type:CART_CLEAR_ITEMS,payload:data} );  
localStorage.removeItem('cartItems')

} catch (error) {


    const message=error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    if (message === "Not authorized, token failed") {
        localStorage.removeItem('profile')
        localStorage.removeItem('token')
     //   router.push("/")
}
dispatch( {
    type: ORDER_CREATE_FAIL,
    payload:message,
} )}
};
