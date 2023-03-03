import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from'redux-thunk';
import {composeWithDevTools} from'redux-devtools-extension';
<<<<<<< HEAD
import { PRODUCT_DETAIL_Reducer, PRODUCT_LIST_Reducer } from './Reducers/ProductReducers';
import { Link } from 'next/link';

const rducer=combineReducers({
    productList:PRODUCT_LIST_Reducer,
    productDetail:PRODUCT_DETAIL_Reducer
=======
import { PRODUCT_LIST_Reducer } from './Reducers/ProductReducers';

const rducer=combineReducers({
    productList:PRODUCT_LIST_Reducer
>>>>>>> 796d1079518810912263b1fa7cb93163e5de5037
})

const initialState = {}
const middleware=[thunk]
const store=createStore(
    rducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
<<<<<<< HEAD
    export default store
=======
    export default store
>>>>>>> 796d1079518810912263b1fa7cb93163e5de5037
