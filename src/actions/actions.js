import axios from 'axios'
export const fetchLogin = (loginObj) => (dispatch) => {

    dispatch({type: 'FETCH_LOGIN_REQUEST'})

    return axios({
            url: "https://acapp.herokuapp.com/login",
            method: 'POST',
            data: loginObj       
        })
        .then(res => dispatch({ type: 'FETCH_LOGIN_SUCCESS', payload: res.data }))
        .catch(error => dispatch({ type: 'FETCH_LOGIN_FAILURE', payload: error.message }))
}




/* return fetch("https://acapp.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(loginObj),
            headers: new Headers().set("content-type", "application/json")
        })
        .then(res => {
            console.log(res)
            if (res.status == 401) {
                dispatch({ type: 'FETCH_LOGIN_FAILURE', payload:'eror' }
            }
            return res.json()
        })
        .then(data => dispatch({ type: 'FETCH_LOGIN_SUCCESS', payload: data.access_token }))
        .catch(error => dispatch({ type: 'FETCH_LOGIN_FAILURE', error: error.message }))
     */