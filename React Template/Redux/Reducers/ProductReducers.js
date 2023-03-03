import {PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from '../Constants/ProductConstants';

export const PRODUCT_LIST_Reducer = (state={ products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true,products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false,products:action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false,error:action.payload};
                
        default:
            return state
    }
}


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

