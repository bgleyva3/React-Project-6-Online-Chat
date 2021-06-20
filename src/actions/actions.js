import axios from 'axios'

export const fetchLogin = (loginObj) => (dispatch) => {

    dispatch({type: 'FETCH_LOGIN_REQUEST'})
    console.log(loginObj)
    return axios({
            url: "https://acapp.herokuapp.com/login",
            method: 'POST',
            data: loginObj       
        })
        .then(res => dispatch({ type: 'FETCH_LOGIN_SUCCESS', payload: res.data }))
        .catch(error => dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: error.message }))
}

/* export const fetchRegister = (regObj) => (dispatch) => {

    dispatch({type: 'FETCH_LOGIN_REQUEST'})
    console.log(loginObj)
    return axios({
            url: "https://acapp.herokuapp.com/users",
            method: 'POST',
            data: loginObj       
        })
        .then(res => dispatch({ type: 'FETCH_LOGIN_SUCCESS', payload: res.data }))
        .catch(error => dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: error.message }))
} */


