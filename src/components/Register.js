import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

const Register = () => {
      
    const history = useHistory() 
    const {handleSubmit, register, reset} = useForm()

    const dispatch = useDispatch()

    const handleRegister = (regObj) => {
        /* dispatch(fetchRegister(regObj)) */
    }
    

    return (
        <div>
            <form className="register-container" onSubmit={handleSubmit((e) => handleRegister(e,reset))} >
                <input placeholder="Username" {...register("name", { required: true })} ></input>
                <input placeholder="Email" {...register("username", { required: true })} ></input>
                <input placeholder="Password" {...register("password", { required: true })} ></input>
                <button type="submit" >Sign up</button>
            </form>
        </div>
    )
}

export default Register