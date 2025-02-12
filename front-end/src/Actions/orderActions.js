import Axios from "axios";
import { CART_EMPTY } from "../Constants/cartConstants";
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL
} from "../Constants/orderConstants";

const  createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: 'Bearer'+userInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/'+orderId, {
      headers: { Authorization: 'Bearer'+userInfo.token },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

const listMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/myOrders', {
      headers: {
        Authorization: 'Bearer'+userInfo.token,
      },
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: message });
  }
};

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders", {
      headers: 
        { Authorization: 'Bearer' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}


const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
   userLogin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put('/api/orders/'+order._id+'/pay', paymentResult, {
      headers: { Authorization: 'Bearer'+userInfo.token },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};


const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userLogin: { userInfo } } = getState();
    const { data } = await Axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer' + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}


const saveOrder=(order)=>async(dispatch,getState)=>{

  try{
      dispatch({type:ORDER_SAVE_REQUEST,payload:order});
      const{userLogin:{userInfo}}=getState();
      if(!order._id){
          const{data}=await Axios.post('/api/orders',order,{headers:{Authorization:'Bearer'+userInfo.token}})
          dispatch({type:ORDER_SAVE_SUCCESS,payload:data});
      }else{
          const{data}=await Axios.put('/api/orders/'+order._id,order,{headers:{Authorization:'Bearer'+userInfo.token}})
          dispatch({type:ORDER_SAVE_SUCCESS,payload:data});
      }
  }catch(err){
      dispatch({type:ORDER_SAVE_FAIL,payload:err.message});

  }

}



export { createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder,saveOrder };