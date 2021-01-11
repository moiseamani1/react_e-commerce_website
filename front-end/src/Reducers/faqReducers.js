import { FAQ_LIST_FAIL, FAQ_LIST_REQUEST, FAQ_LIST_SUCCESS } from "../Constants/faqConstants";




const faqListReducer = (
    state = { faq: [] },
    action
) => {
    switch (action.type) {
        case FAQ_LIST_REQUEST:
            return { loading: true };
        case FAQ_LIST_SUCCESS:
            return { loading: false, faq: action.payload };
        case FAQ_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export { faqListReducer}