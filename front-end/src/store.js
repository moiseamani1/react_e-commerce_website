import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer,
  productCategoryListReducer,productColorListReducer,productBrandListReducer,
  productFeaturedListReducer } from './Reducers/productReducers';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    
    orderListReducer,
    orderDeleteReducer,
    myOrdersListReducer,
    orderSaveReducer,
  } from './Reducers/orderReducers';
import { cartReducer } from './Reducers/cartReducers';
import thunk from 'redux-thunk';

import { userCreateAccountReducer, userDetailsReducer, userLoginReducer, userUpdateProfileReducer, } from './Reducers/userReducers';
import { faqListReducer } from './Reducers/faqReducers';

// const cartItems = Cookie.getJSON('cartItems') || [];
// const userInfo = Cookie.getJSON('userInfo') || null;
const initState = { 
userLogin: {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
},
cart: {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],

  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {fullName:'',address:'',city:'',postalCode:'',country:''},
  
   paymentMethod:'PayPal' 
},

}

const reducer = combineReducers({

   
    cart: cartReducer,

    userLogin: userLoginReducer,
    userCreateAccount: userCreateAccountReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userDetails: userDetailsReducer,


    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productColorList: productColorListReducer,
    productBrandList: productBrandListReducer,
    productFeaturedList: productFeaturedListReducer,
    
    


    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrdersList: myOrdersListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderSave: orderSaveReducer,
    faqList:faqListReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initState, compose(applyMiddleware(thunk)));
export default store;