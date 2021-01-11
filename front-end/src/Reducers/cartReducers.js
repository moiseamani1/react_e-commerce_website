import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING,CART_QUICK_ADD_ITEM } from "../Constants/cartConstants";

function cartReducer(state = {
    cartItems: []
}, action) {

    switch (action.type) {
        case CART_QUICK_ADD_ITEM:
            const quickItem = action.payload;
            const quickProduct = state.cartItems.find((x) => x.product === quickItem.product);

            
        if (quickProduct) {
            quickProduct.quantity++;
            return { ...state, cartItems: state.cartItems.map((x) => x.product === quickProduct.product ? quickProduct : x) };
        }

        return { ...state, cartItems: [...state.cartItems, quickItem] };  
        case CART_ADD_ITEM:
            let item = action.payload;
            let product = state.cartItems.find((x) => x.product === item.product);

            if (product) {

                return { ...state, cartItems: state.cartItems.map((x) => x.product === product.product ? item : x) };
            }

            return { ...state, cartItems: [...state.cartItems, item] };


        
        case CART_REMOVE_ITEM:
            return { ...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload) };

        case CART_SAVE_SHIPPING:
            return { ...state, shippingAddress: action.payload };
        case CART_SAVE_PAYMENT:
            return { ...state, paymentMethod: action.payload };
        case CART_EMPTY:
            return { ...state, cartItems: [] };
        
        default:
            return state;
    }


}

export { cartReducer };