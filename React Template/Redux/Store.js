import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {PRODUCTCreateReviewReducer, PRODUCT_DETAIL_Reducer, PRODUCT_LIST_Reducer } from './Reducers/ProductReducers';
import { Link } from 'next/link';
import { cartReducer } from './Reducers/CartReducers';
import { orderCreateReducer , orderDetailsReducer, orderListMyReducer, orderPayReducer } from './Reducers/OrderReducers';

const rducer = combineReducers({
  productList: PRODUCT_LIST_Reducer,
  productDetail: PRODUCT_DETAIL_Reducer,
  productReviewCreate: PRODUCTCreateReviewReducer,

  cart: cartReducer,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  orderListMy:orderListMyReducer

});

const middleware = [thunk];

let initialState = {};

if (typeof window !== 'undefined') {
  console.log("*****************11111111111**************")
  const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

  const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') 
  ? JSON.parse(localStorage.getItem('shippingAddress'))
   : {};


  initialState = {
    cart: {
      cartItems: cartItemsFromLocalStorage,
      shippingAddress:shippingAddressFromLocalStorage,
    },
  };
  console.log(cartItemsFromLocalStorage)
}

const store = createStore(rducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { PRODUCT_DETAIL_Reducer, PRODUCT_LIST_Reducer } from './Reducers/ProductReducers';
// import { Link } from 'next/link';
// import { cartReducer } from './Reducers/CartReducers';

// const rducer = combineReducers({
//   productList: PRODUCT_LIST_Reducer,
//   productDetail: PRODUCT_DETAIL_Reducer,
//   cart: cartReducer
// });

// let cartItemsFromLocalStorage = [];

// if (process.browser) {
//   cartItemsFromLocalStorage = localStorage.getItem('cartItems')
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : [];
// }

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromLocalStorage
//   }
// };

// const middleware = [thunk];
// const store = createStore(
//   rducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
