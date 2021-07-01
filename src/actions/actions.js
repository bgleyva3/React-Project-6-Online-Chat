
const axios = require('axios');
const baseUrl = 'https://acapp.herokuapp.com';


export const getStatusAPI = (message) =>{
    return(dispatch) => {
        return axios.get(`${baseUrl}/ping`)
        .then(() => dispatch({type: 'error-handler', payload: message}))
        .catch(err => dispatch({type: 'error-handler', payload: "Could not connect to sever. It should be back in a couple of minutes"}))
    }
}

export const postLoginThunk = (data) =>{
    return (dispatch) => {
        setTimeout(function(){ dispatch({type: 'problems-message', payload: true}) }, 12000);
        dispatch({type: 'is-loading', payload: true})
        return axios.post(`${baseUrl}/login`, {
            username: data.username,
            password: data.password
          })
        .then(resp => dispatch({type: 'post-login-success', payload: resp.data}))
        .then(() => dispatch({type: 'is-loading', payload: false}))
        .catch(() => dispatch(getStatusAPI("Incorrect email or password")))
        .then(() => dispatch({type: 'is-loading', payload: false}))
    }

}

export const postRegisterThunk = (data) =>{
    console.log(data)
    return (dispatch) => {
        dispatch({type: 'is-loading', payload: true})
        return axios.post(`${baseUrl}/users`, {
            username: data.username,
            password: data.password,
            name: data.name,
          })
        .then(() => dispatch(postLoginThunk(data)))
        .then(() => dispatch({type: 'is-loading', payload: false}))
        .catch(() => dispatch(getStatusAPI("User already exists")))
        .then(() => dispatch({type: 'is-loading', payload: false}))
    }
}
