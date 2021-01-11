import Axios from 'axios'
import { CART_ADD_ITEM, CART_QUICK_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from '../Constants/cartConstants';
import Cookie from 'js-cookie';

const addToCart = (productId, quantity,quick) => async (dispatch, getState) => {

    try {
        const { data } = await Axios.get('/api/products/' + productId);

        if(quick){
            dispatch({
                type: CART_QUICK_ADD_ITEM, payload: {
                    product: data._id,
                    name: data.name,
                    brand:data.brand,
                    image: data.image,
                    price: data.price,
                    inventory: data.inventory,
                    quantity
    
                }
            })

        }else{
            dispatch({
                type: CART_ADD_ITEM, payload: {
                    product: data._id,
                    name: data.name,
                    brand:data.brand,
                    image: data.image,
                    price: data.price,
                    inventory: data.inventory,
                    quantity
    
                }
            })
        }
        
        const { cart: { cartItems } } = getState();
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (err) {

    }

}









const removeFromCart = (productId) => (dispatch,getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  }


  const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }
  export { addToCart, removeFromCart, saveShipping, savePayment, }




