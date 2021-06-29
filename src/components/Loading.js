import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Loading = () => {
    return (
        <div align='center'>
            <Loader className='loader-style' type="TailSpin" color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default Loading