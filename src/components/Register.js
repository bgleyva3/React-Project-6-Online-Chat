import React from 'react'
import { postRegisterThunk } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from 'react-hook-form';

const Register = () => {
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const error = useSelector(state => state.error)

    const handleRegister = () => {
        dispatch({ type: 'show-register', payload: false })
    }

    const onSubmit = (user) => {
        dispatch(postRegisterThunk(user))
        reset();
    }
    return (
        <div>
            <div onClick={handleRegister}></div>
            <div> 
            <i onClick={handleRegister}></i>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 >Register</h3>
                    <div>
                        <input type="text" {...register('name',  {required: true})} placeholder="username" />
                        <input type="email" {...register('username', {required: true})} placeholder="Email" />
                        <input type="password" {...register('password',  {required: true})} placeholder="Password" />
                    </div>
                        {error && <div style={{color: "red", marginBottom: "1rem"}} role="alert">{ error }</div>}
                        <button>REGISTER</button>
                </form>
            </div>
        </div>
    )
}

export default Register
