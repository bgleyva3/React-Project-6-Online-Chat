import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import Loading from './Loading'
import { fetchLogin } from '../actions/actions'

const Login = () => {
      
    const history = useHistory() 
    const {handleSubmit, register, reset} = useForm()
    
    const dispatch = useDispatch()
    const login_item = useSelector(state => state.login_item)
    const error = useSelector(state => state.error)
    const loading = useSelector(state => state.loading)


    const handleLogin = (loginObj) => {
        reset()
        dispatch(fetchLogin(loginObj))
    }

    useEffect(() => {
        if(login_item){
            console.log(login_item)
            history.push("/home")
        } else if(error){
            console.log(error)
        }
    }, [login_item, error, history])


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