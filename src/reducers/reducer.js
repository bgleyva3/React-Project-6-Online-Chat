
const INITIAL_STATE = {
    accessToken: null,
    loading: false,
    error: null,
    showRegister: false,
    problemsMessage: false,
    showOncloseMessage: false
}

const reducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case 'post-login-success': {
            return {...state, accessToken: action.payload.access_token}
        }
        case 'error-handler': {
            return {...state, error: action.payload}
        }
        case 'is-loading':{
            return {...state, loading: action.payload}
        }
        case 'show-register': {
            return {...INITIAL_STATE, showRegister: action.payload}
        }
        case 'problems-message': {
            return {...state, problemsMessage: action.payload}
        }
        case 'show-onclose-message': {
            return {...INITIAL_STATE, showOncloseMessage: true}
        }
        case 'clear-all': {
            return {...INITIAL_STATE}
        }
        default:
            return state;
    }
}

export default reducer;