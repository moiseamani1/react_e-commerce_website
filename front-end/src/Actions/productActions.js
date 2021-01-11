import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_FEATURED_LIST_REQUEST,
    PRODUCT_FEATURED_LIST_SUCCESS,
    PRODUCT_FEATURED_LIST_FAIL,
    PRODUCT_COLOR_LIST_REQUEST,
    PRODUCT_COLOR_LIST_SUCCESS,
    PRODUCT_COLOR_LIST_FAIL,
    PRODUCT_BRAND_LIST_SUCCESS,
    PRODUCT_BRAND_LIST_REQUEST,
    PRODUCT_BRAND_LIST_FAIL,
  } from '../Constants/productConstants';
import axios from 'axios';

const listProducts = ({
    category = '',
    color = '',
    brand = '',
    keyword = '',
    order = '',
    min='',
    max='',
    page='',
  }) => async (dispatch) => {

    
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/api/products?category=${category}&color=${color}&brand=${brand}&keyword=${keyword}&order=${order}&min=${min}&max=${max}&page=${page}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message })

    }

}

const listProductCategories = () => async (dispatch) => {
    
    try {
     dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST, loading: true });
      const result = await axios.get('/api/products/categories');
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const listProductColors = () => async (dispatch) => {
    
    try {
     dispatch({ type: PRODUCT_COLOR_LIST_REQUEST, loading: true });
      const result = await axios.get('/api/products/colors');
      dispatch({ type: PRODUCT_COLOR_LIST_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_COLOR_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const listProductBrands = () => async (dispatch) => {
    
    try {
     dispatch({ type: PRODUCT_BRAND_LIST_REQUEST, loading: true });
      const result = await axios.get('/api/products/brands');
      dispatch({ type: PRODUCT_BRAND_LIST_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_BRAND_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };










  const listProductFeatured = () => async (dispatch) => {
    
    try {
     dispatch({ type: PRODUCT_FEATURED_LIST_REQUEST, loading: true });
      const result = await axios.get('/api/products/featured');
      dispatch({ type: PRODUCT_FEATURED_LIST_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: PRODUCT_FEATURED_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };






const saveProduct=(product)=>async(dispatch,getState)=>{

    try{

        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
        const{userLogin:{userInfo}}=getState();
        if(!product._id){
            const{data}=await axios.post('/api/products',product,{headers:{Authorization:'Bearer'+userInfo.token}})
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data});
        }else{
            const{data}=await axios.put('/api/products/'+product._id,product,{headers:{Authorization:'Bearer'+userInfo.token}})
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data});
        }
    }catch(err){
        dispatch({type:PRODUCT_SAVE_FAIL,payload:err.message});

    }

}



const detailsProduct = (productId) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (err) {

        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message });
    }
}

const deleteProduct = (productId) => async(dispatch,getState) => {

    try {
        const{userLogin:{userInfo}}=getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
        
       const { data } = await axios.delete("/api/products/" + productId,{
           headers:{Authorization:'Bearer'+userInfo.token}});
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data,success:true })
    } catch (err) {

        dispatch({ type: PRODUCT_DELETE_FAIL, payload: err.message });
    }
}





export { listProducts, detailsProduct,saveProduct ,deleteProduct,listProductCategories,listProductFeatured,listProductColors,listProductBrands}