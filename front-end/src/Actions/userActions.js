import axios from 'axios';
// import Cookie from 'js-cookie';
import {
  USER_CREATE_ACCOUNT_FAIL, USER_CREATE_ACCOUNT_REQUEST,
  USER_CREATE_ACCOUNT_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT,

} from '../Constants/userConstants';






const login = (email, password,provider,token) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await axios.post('/api/users/login', { email, password, provider,token });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.message });

  }

}
const logout = () => async(dispatch) => {
  
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_LOGOUT_REQUEST });
  try{
    const { data } = await axios.post('/api/users/logout', );
    
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data,success:true });
    

  }catch(err){
    dispatch({ type: USER_LOGOUT_FAIL, payload: err.message });

  }

  // localStorage.removeItem('userInfo');
  // localStorage.removeItem('cartItems');
  // localStorage.removeItem('shippingAddress');
  // dispatch({ type: USER_LOGOUT });
};
 


const createAccount = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_CREATE_ACCOUNT_REQUEST, payload: { email, password } });

  try {
    const { data } = await axios.post('/api/users/createAccount', { name, email, password});
    dispatch({ type: USER_CREATE_ACCOUNT_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_CREATE_ACCOUNT_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message, });

  }

}

const detailsUser = (userId) => async (dispatch,getState) => {
  console.log('I got here')
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

  const { userLogin: { userInfo },} = getState();
  try {

    const { data } = await axios.get('/api/users/' + userId,{
      headers: { Authorization: 'Bearer'+userInfo.token },});
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUserProfile = (user) => async (dispatch, getState) => {
  try {

   
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
   

    const { userLogin: { userInfo } } = getState();

    const { data } = await axios.put('/api/users/profile', user, {
      headers: {
        Authorization: 'Bearer' + userInfo.token,
      },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export { login, createAccount, updateUserProfile, detailsUser,logout }