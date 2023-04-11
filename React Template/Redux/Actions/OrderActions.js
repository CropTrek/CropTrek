
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS,ORDER_LIST_MY_FAIL } from './../Constants/OrderConstants';
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
return data._id;
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




// order details
export const getOrderDetails= (id)=> async (dispatch,getState)=>{
    if (!id) {
        console.log("ID is null or undefined");
        return;
      }
    
      console.log("ID:", id);
      // Rest of the code
  

      
    try {
        console.log("111122222222222222222222222")

       
        dispatch( {type:ORDER_DETAILS_REQUEST} );
    const token = localStorage.getItem('token');
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
        },
    };
    const {data}=await axios.get(`http://localhost:5000/api/orders/getUser/${id}`)

    console.log(data)
    dispatch( {type:ORDER_DETAILS_SUCCESS,payload:data} );

    
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
        type: ORDER_DETAILS_FAIL,
        payload:message,
    } )}
    };
//order Pay

    export const payOrder= (orderId,paymentResult)=> async (dispatch,getState)=>{


   
          
        try {
        
            
        dispatch( {type:ORDER_PAY_REQUEST} );
        const token = localStorage.getItem('token');
        const config ={
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`,
            },
        };
        const {data}=await axios.post(`http://localhost:5000/api/orders/${orderId}/pay`,paymentResult)
        dispatch( {type:ORDER_PAY_SUCCESS,payload:data} );
    

        
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
            type: ORDER_PAY_FAIL,
            payload:message,
        } )}
        };

//user orders

        
    export const listMyOrders= (orderId,paymentResult)=> async (dispatch,getState)=>{


    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log("3333333333333333333333333333")
    console.log(profile._id)
const idUser=profile._id;
   
          
        try {
        
            
        dispatch( {type:ORDER_LIST_MY_REQUEST} );

        const config ={
            headers:{
             //   "Content-Type": "application/json",
                Authorization:`Bearer ${idUser}`,
            },
        };
   
        const {data}=await axios.get(`http://localhost:5000/api/orders/ordersByUser/${idUser}/orders`,config)
        dispatch( {type:ORDER_LIST_MY_SUCCESS,payload:data} );
      

        
        } catch (error) {
        
        
            const message=error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Cannot read properties of null (reading '_id')") {
                localStorage.removeItem('profile')
                localStorage.removeItem('token')
                router.push("/Auth")
        }
        dispatch( {
            type: ORDER_LIST_MY_FAIL,
            payload:message,
        } )}
        };

    