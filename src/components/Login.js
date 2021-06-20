import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Loading from './Loading'
import { fetchLogin } from '../actions/actions'
import Register from './Register'

const Login = () => {
      
    const history = useHistory() 
    const {handleSubmit, register, reset} = useForm()
    const [registerForm, setRegisterForm] = useState(false)
    
    const dispatch = useDispatch()
    const login_item = useSelector(state => state.loginReducer.login_item)
    const error = useSelector(state => state.loginReducer.error)
    const loading = useSelector(state => state.loginReducer.loading)

    
    useEffect(() => {
        if(login_item){
            console.log(login_item)
            history.push("/home")
        } else if(error){
            console.log(error)
        }
    }, [login_item, error, history])
    
    
    const handleLogin = (loginObj) => {
        reset()
        dispatch(fetchLogin(loginObj))
    }

    const openRegister = () => {
        setRegisterForm(true)
    }


    return (
        <div>
            {registerForm && <Register />}
            <form onSubmit={handleSubmit((e) => handleLogin(e,reset))} >
                <input placeholder="Email" {...register("username", { required: true })} ></input>
                <input placeholder="Password" {...register("password", { required: true })} ></input>
                <button type="submit" >Log in</button>
                {loading ? <Loading /> : <div></div>}
                <p className="register" onClick={openRegister}>Create new account</p>
            </form>
        </div>
    )
}

export default Login