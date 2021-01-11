const { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
   USER_CREATE_ACCOUNT_REQUEST, USER_CREATE_ACCOUNT_SUCCESS, 
   USER_CREATE_ACCOUNT_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS,
     USER_UPDATE_PROFILE_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, 
     USER_DETAILS_FAIL, USER_DETAILS_RESET, USER_UPDATE_PROFILE_RESET, USER_LOGOUT, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL } = require("../Constants/userConstants");

const userLoginReducer=(state={},action)=>{

    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading:true};
        case USER_LOGIN_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload};
        case USER_LOGOUT_REQUEST:
              return {loading:true};      
        case USER_LOGOUT_SUCCESS:
              return {};   
        case USER_LOGOUT_FAIL:
          return {loading:false,error:action.payload};   
        default:
            return state;
    }


}

const userCreateAccountReducer=(state={},action)=>{

    switch(action.type){
        case USER_CREATE_ACCOUNT_REQUEST:
            return { loading:true};
        case USER_CREATE_ACCOUNT_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_CREATE_ACCOUNT_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }


  }
const userDetailsReducer =(state = { loading: true }, action) =>{
      
      
        switch (action.type) {
          case USER_DETAILS_REQUEST:
            return { loading: true };
          case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
          case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };

const userUpdateProfileReducer=(state = {}, action) =>{
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success:true};
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };

      case USER_UPDATE_PROFILE_RESET:
        return {}; 
      default: 
        return state;
    }
  }


export{userLoginReducer,userCreateAccountReducer,userUpdateProfileReducer,userDetailsReducer};