import  axios  from 'axios';
import {PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from '../Constants/ProductConstants';
// List Products
import { get, set } from 'local-storage';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS
} from "../Constants/OrderConstants";
import {CART_CLEAR_ITEMS} from "../Constants/CartConstants";

export const eeeee= (keyword=" ",pageNumber= " ")=>async (dispatch) => {

    try {
        dispatch({type:PRODUCT_LIST_REQUEST});

        const {data}=await axios.get(
            `http://localhost:5000/api/products?keyword=${keyword}`);
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

        console.log('====================================');
        console.log(data);
        console.log('====================================');
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});


    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message :
            error.message


        })
    }
}

// Single Product
export const listProductDetail= (id)=>async (dispatch) => {
    try {
        dispatch({type:PRODUCT_DETAIL_REQUEST});
        const {data}=await axios.get(`http://localhost:5000/api/products/${id}`);

        dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:data});


    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message :
            error.message
            
            
        })
    }
}

// Product Review 

export const createProductReview =
(productId,review)=> async (dispatch,getState) => {


    const profile = get('profile');



      try {
      dispatch( {type:PRODUCT_CREATE_REVIEW_REQUEST} );
  
  
      const idUser=profile._id;
      const config ={
          headers:{
              "Content-Type": "application/json",
              Authorization:`Bearer ${idUser}`,
          },
      };
      const response = await axios.post(`http://localhost:5000/api/products/${productId}/${idUser}/Review`, review,config);
      dispatch( {type:PRODUCT_CREATE_REVIEW_SUCCESS} );
  
    


    } catch (error) {
      const message=error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      if (message === "Cannot read properties of null (reading '_id')") {
       
      
    
        console.log(error);
       
  
  }
  dispatch( {
    type: PRODUCT_CREATE_REVIEW_FAIL,
    payload:message,
  })
     
    }
  }


export const listMyProducts= async ()=>{


    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log("3333333333333333333333333333")
    console.log(profile._id)
    const idUser=profile._id;


    try {



        const config ={
            headers:{
                //   "Content-Type": "application/json",
                Authorization:`Bearer ${idUser}`,
            },
        };

        const {data}=await axios.get(`http://localhost:5000/api/products/productsByUser/${idUser}/products`,config)

return data;

    } catch (error) {


        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Cannot read properties of null (reading '_id')") {
            localStorage.removeItem('profile')
            localStorage.removeItem('token')
            router.push("/Auth")
        }
        throw new Error(message);
    }
};

// Create Product

export const createProduct= ( name, price, description, image, countInStock)=> async (dispatch,getState)=>{
console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log("3333333333333333333333333333")
    console.log(profile._id)
    const idUser=profile._id;


    try {



        const config ={
            headers:{
                //   "Content-Type": "application/json",
                Authorization:`Bearer ${idUser}`,
            },
        };
        const {data}=await axios.post(`http://localhost:5000/api/products/${idUser}`,{ name, price, description, image, countInStock},config)
console.log(data)
    } catch (error) {


        const message=error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            localStorage.removeItem('profile')
            localStorage.removeItem('token')
            //   router.push("/")
        }
        }
};

export default {eeeee,listProductDetail,createProduct};

