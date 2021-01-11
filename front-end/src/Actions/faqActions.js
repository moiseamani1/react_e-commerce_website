
import axios from 'axios';
import { FAQ_LIST_FAIL, FAQ_LIST_REQUEST, FAQ_LIST_SUCCESS } from '../Constants/faqConstants';


  const listFaq = () => async (dispatch) => {
    
    try {
     dispatch({ type: FAQ_LIST_REQUEST, loading: true });
      const result = await axios.get('/api/faqs');
      dispatch({ type: FAQ_LIST_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: FAQ_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export { listFaq}