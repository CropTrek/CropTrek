import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from'redux-thunk';
import {composeWithDevTools} from'redux-devtools-extension';
import { PRODUCT_DETAIL_Reducer, PRODUCT_LIST_Reducer } from './Reducers/ProductReducers';
import { Link } from 'next/link';

const rducer=combineReducers({
    productList:PRODUCT_LIST_Reducer,
    productDetail:PRODUCT_DETAIL_Reducer
})

const initialState = {}
const middleware=[thunk]
const store=createStore(
    rducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
    export default store
