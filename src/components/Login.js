import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Loading from './Loading'

const Login = () => {
    const [loginResponse, setLoginResponse] = useState(null)
    const [loginObj, setLoginObj] = useState(null)
   
    const history = useHistory() 
    const {handleSubmit, register, reset} = useForm()
    
    const dispatch = useDispatch()
    const login_petition = useSelector(state => state.login_petition)
    const login_access = useSelector(state => state.login_access)
    const loading = useSelector(state => state.loading)


    const handleLogin = (e) => {
        setLoginObj(e)
        reset()
        dispatch({ type: 'login_petition', payload: true })
    }

    useEffect(() => {
        if(login_petition){
            console.log(loginObj)
            fetch("https://acapp.herokuapp.com/login", {
                method: "POST",
                body: JSON.stringify(loginObj),
                headers: new Headers().set("content-type", "application/json")
            })
            .then(res => res.json())
            .then(data => (
                setLoginResponse(data),
                console.log(data)
                ))
        }
    }, [login_petition])

    useEffect(() => {
        if(loginResponse){
            if(loginResponse.access_token){
                dispatch({ type: 'login_access' })
            }
            dispatch({ type: 'login_petition', payload: false })
        }
    }, [loginResponse])

    useEffect(() => {
        if(login_access){
            console.log(login_access)
            history.push("/home")
        }
    }, [login_access])

    return (
        <div>
            <form onSubmit={handleSubmit((e) => handleLogin(e,reset))} >
                <input placeholder="Email" {...register("username", { required: true })} ></input>
                <input placeholder="Password" {...register("password", { required: true })} ></input>
                <button type="submit" >Log in</button>
                {loading ? <Loading /> : <div></div>}
            </form>
        </div>
    )
}

export default Login