import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const Loading = () => {
    const problemsMessage = useSelector(state => state.problemsMessage)

    return (
        <div align='center'>
            <Loader className='loader-style' type="TailSpin" color="#00BFFF" height={80} width={80} />
            {problemsMessage && <h3 style={{width:"70vw"}}>We are experiencing problems connecting to server</h3>}
        </div>
    )
}

export default Loading