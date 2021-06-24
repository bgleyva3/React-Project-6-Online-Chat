// import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postLoginThunk } from '../actions/actions';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import Loading from './Loading'
import Register from './Register'

const Login = () => {
    const {register, handleSubmit, reset} = useForm();
    const accessToken = useSelector(state => state.accessToken);
    const error = useSelector(state => state.error);
    const isLoading = useSelector(state => state.loading);
    const showRegister = useSelector(state => state.showRegister);
    const dispatch = useDispatch();
    const history = useHistory();

   useEffect(()=>{
    if (accessToken) {
        console.log(accessToken)
        history.push('/App');
    }
    console.log(accessToken)
   }, [history, accessToken])

    const handleLogin = (values) => {
        dispatch(postLoginThunk(values))
        reset();
    }

    const handleRegister = () => {
        dispatch({ type: 'show-register', payload: 'true' })
    }


    return (
        <>
            <div>
                {
                    isLoading && 
                        <div>
                        <Loading />
                        </div>
                } 
                {showRegister && <Register/>}
                <div>
                    <h2>Log in</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <input type="email" {...register('username', {required: true})} placeholder="Email"/>  
                        <input type="password" {...register('password', {required: true})} placeholder="Password"/>               
                        <button type="submit" >Login</button>
                    </form>
                    { error && <div>{ error }</div>}
                    <p className="link-style" onClick={handleRegister}>Create a new account</p>
                </div>
            </div>
        </>
    )
}

export default Login