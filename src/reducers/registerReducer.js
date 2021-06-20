const initState = { 
    login_item: null,
    user_id: null,
    loading: false,
    error: null
}

const loginReducer = ( state = initState, action ) => {
    switch(action.type){
        case 'FETCH_LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'FETCH_LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                login_item: action.payload.access_token,
                user_id: action.payload.userId,
                error: null
            }
        case 'FETCH_LOGIN_FAILURE':
            return {
              ...state,
              loading: false,
              error: action.payload
            }
        default:
            return state
    }
}

export default loginReducer;