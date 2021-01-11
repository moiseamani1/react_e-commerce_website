import { PRODUCT_DELETE_FAIL,
     PRODUCT_DELETE_REQUEST,
      PRODUCT_DELETE_SUCCESS, 
      PRODUCT_DETAILS_FAIL, 
      PRODUCT_DETAILS_REQUEST, 
      PRODUCT_DETAILS_SUCCESS, 
      PRODUCT_LIST_FAIL,
       PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_SAVE_FAIL, 
        PRODUCT_SAVE_REQUEST, 
        PRODUCT_SAVE_SUCCESS,
        PRODUCT_CATEGORY_LIST_REQUEST,
        PRODUCT_CATEGORY_LIST_SUCCESS,
        PRODUCT_CATEGORY_LIST_FAIL,
        PRODUCT_FEATURED_LIST_REQUEST,
        PRODUCT_FEATURED_LIST_SUCCESS,
        PRODUCT_FEATURED_LIST_FAIL,
        PRODUCT_COLOR_LIST_REQUEST,
        PRODUCT_COLOR_LIST_SUCCESS,
        PRODUCT_COLOR_LIST_FAIL,
        PRODUCT_BRAND_LIST_REQUEST,
        PRODUCT_BRAND_LIST_SUCCESS,
        PRODUCT_BRAND_LIST_FAIL
    
    } from "../Constants/productConstants";

function productListReducer(state = { products: [] }, action) {

    switch (action.type) {

        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products,numProducts: action.payload.numProducts };

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }

}

const productCategoryListReducer = (
    state = { categories: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const productColorListReducer = (
    state = { colors: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_COLOR_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_COLOR_LIST_SUCCESS:
            return { loading: false, colors: action.payload };
        case PRODUCT_COLOR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


const productBrandListReducer = (
    state = { brands: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_BRAND_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_BRAND_LIST_SUCCESS:
            return { loading: false, brands: action.payload };
        case PRODUCT_BRAND_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};







const productFeaturedListReducer = (
    state = { featured: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_FEATURED_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_FEATURED_LIST_SUCCESS:
            return { loading: false, featured: action.payload };
        case PRODUCT_FEATURED_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};







function productDetailsReducer(state = { product: {} }, action) {

    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }

}

function productSaveReducer(state = { product: {} }, action) {

    switch (action.type) {

        case PRODUCT_SAVE_REQUEST:
            return { loading: true };
        case PRODUCT_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }

}


function productDeleteReducer(state = { product: {} }, action) {

    switch (action.type) {

        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, product: action.payload, success: true };

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }

}



export { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer,
     productCategoryListReducer,productColorListReducer,productBrandListReducer,
      productFeaturedListReducer }