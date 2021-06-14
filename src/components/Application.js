import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useForm } from "react-hook-form"
import RoomInput from './RoomInput'
import ChatContainer from './ChatContainer'

const Application = () => {

    const dispatch = useDispatch()
    const login_item = useSelector(state => state.loginReducer.login_item)
    const sesionClosed = useSelector(state => state.chatReducer.sesionClosed)


    useEffect(() => {
        const encoded = encodeURI(login_item)
        if(login_item){
            let data = new W3CWebSocket('wss://acapp.herokuapp.com/ws', ['token', encoded])
            dispatch({ type: 'SET_CLIENT', payload: data })
        }
    }, [login_item])



    return(
        <div>
            { sesionClosed && <div className="sesion-closed-container" onClick={() => window.location.reload()}>
                    <div className="sesion-closed">
                        <h3>Due to long time inactivity</h3>
                        <h1>SESION CLOSED...</h1>
                    </div>
                </div>
            }
            <RoomInput />
            <h3>ROOMS:</h3>
            <ChatContainer />
        </div>
    )
}

export default Application

