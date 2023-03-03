<<<<<<< HEAD
import {PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from '../Constants/ProductConstants';

export const PRODUCT_LIST_Reducer = (state={ products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true,products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false,products:action.payload};
        case PRODUCT_LIST_FAIL:
=======
export const PRODUCT_LIST_Reducer = (state={ products:[]},action)=>{
import {PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL } from './../Constants/Productconstants';
    switch(action.type){
        case 'PRODUCT_LIST_REQUEST':
            return {loading: true,products:[]};
        case 'PRODUCT_LIST_SUCCESS':
            return {loading: false,products:action.payload};
        case 'PRODUCT_LIST_FAIL':
>>>>>>> 796d1079518810912263b1fa7cb93163e5de5037
            return {loading: false,error:action.payload};
                
        default:
            return state
    }
}
<<<<<<< HEAD


// Product Detail(produit wehed)
export const PRODUCT_DETAIL_Reducer = (state={ product:{reviews:[]}},action)=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {...state,loading: true};
        case PRODUCT_DETAIL_SUCCESS:
            return {loading: false,product:action.payload};
        case PRODUCT_DETAIL_FAIL:
            return {loading: false,error:action.payload};
                
        default:
            return state
    }
}

=======
>>>>>>> 796d1079518810912263b1fa7cb93163e5de5037
