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
        <div className="register-parent">
            <div className="register-background" onClick={handleRegister}></div>
            <div className="register-container"> 
            <i className="fas fa-2x fa-times-circle cancel-button" onClick={handleRegister}></i>
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="form-title">Register</h3>
                    <div className="register-fields">
                        <input className="input-register" type="text" {...register('name',  {required: true})} placeholder="username" />
                        <input className="input-register" type="email" {...register('username', {required: true})} placeholder="Email" />
                        <input className="input-register" type="password" {...register('password',  {required: true})} placeholder="Password" />
                    </div>
                        {error && <div style={{color: "red", marginBottom: "1rem"}} role="alert">{ error }</div>}
                        <button className="button-style green-color">REGISTER</button>
                </form>
            </div>
        </div>
    )
}

export default Register
