// import React, {useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { postLoginThunk } from '../actions/actions';
import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import Register from './Register'
import Loading from './Loading'

const Login = () => {
    const {register, handleSubmit, reset} = useForm();
    const accessToken = useSelector(state => state.accessToken);
    const error = useSelector(state => state.error);
    const isLoading = useSelector(state => state.loading);
    const showOncloseMessage = useSelector(state => state.showOncloseMessage);
    const showRegister = useSelector(state => state.showRegister);
    const dispatch = useDispatch();
    const history = useHistory();

   useEffect(()=>{
    if (accessToken) {
        history.push('/App');
    }
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
           {showOncloseMessage && <h3 style={{textAlign: "center"}}>Sesion closed due to 2 min of inactivity</h3>}
            <div className="center-container">
                {
                    isLoading && 
                        <div className="loading-container">
                        <Loading />
                        </div>
                } 
                {showRegister && <Register/>}
                <div className="main-title">
                    <h3 style={{textAlign: "center", marginBottom: "-2rem", fontWeight:"500"}}>Online</h3>
                    <h1 className="chat-room-title">Chat Rooms</h1>
                </div>
                <div className="form-container">
                    <h2 className="form-title">Log in</h2>
                    <form className="form-style" onSubmit={handleSubmit(handleLogin)}>
                        <input className="input-style" type="email" {...register('username', {required: true})} placeholder="Email"/>  
                        <input className="input-style" type="password" {...register('password', {required: true})} placeholder="Password"/>               
                        <button className="button-style green-color" type="submit" ><i className="fas fa-sign-in-alt"></i></button>
                    </form>
                    { error && <div className="incorrect-message">{ error }</div>}
                    <p className="link-style" onClick={handleRegister}>Create a new account</p>
                </div>
                <div className="guests-container">
                    <div className="or-style">or</div>
                    <button className="text-button green-color" onClick={() => handleLogin({username: "guest1@gmail.com", password: "test123"})}>Join as Guest 1</button>
                    <button className="text-button green-color" onClick={() => handleLogin({username: "guest2@gmail.com", password: "test123"})}>Join as Guest 2</button>
                </div>
            </div>
        </>
    )
}

export default Login