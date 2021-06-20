import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import Loading from './Loading'


const Chat = () => {

    const {handleSubmit, register, reset} = useForm()

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.loginReducer.user_id)

    const roomObj = useSelector(state => state.chatReducer.roomObj)
    const client = useSelector(state => state.chatReducer.client)
    const roomID = useSelector(state => state.chatReducer.roomID)
    const roomName = useSelector(state => state.chatReducer.roomName)
    const allMessages = useSelector(state => state.chatReducer.allMessages)
    const allSenders = useSelector(state => state.chatReducer.allSenders)
    const conversation = useSelector(state => state.chatReducer.conversation)
    const messagesPosition = useSelector(state => state.chatReducer.messagesPosition)
    const connectedUsers = useSelector(state => state.chatReducer.connectedUsers)
    const userLeft = useSelector(state => state.chatReducer.userLeft)
    //const leaveOldRoom = useSelector(state => state.chatReducer.leaveOldRoom)
    const loading = useSelector(state => state.chatReducer.loading)
    //const initialFlag = useSelector(state => state.chatReducer.initialFlag)
    const estado = useSelector(state => state.chatReducer)

    const [initialFlag, setInitialFLag] = useState(false)
    const [reconfirm, setReconfirm] = useState(false)

    /* const SOCKET_LEAVE_ROOM = {
        "action": "leave-room",
        "message": "Mario Kart",
        "target": null,
        "sender": {
        "id": 1,
        "name": "Carlos Reyes" // Sender es un usuario o el sistema
        }
    }  */

    /* const leaveRoom = () => {
        SOCKET_LEAVE_ROOM.message = leaveOldRoom
        SOCKET_LEAVE_ROOM.target = {id: roomID, name: roomName}
        console.log(SOCKET_LEAVE_ROOM)
        client.send(JSON.stringify(SOCKET_LEAVE_ROOM))
        client.send(JSON.stringify({ action: 'leave-room', message: "Mario Kart" }))
    } */

    useEffect(()=>{
        console.log("-------------------")
        console.log(estado)
        console.log("-------------------")
        /* SOCKET_LEAVE_ROOM.message = leaveOldRoom
        client.send(JSON.stringify(SOCKET_LEAVE_ROOM)) */
        if(client){
                console.log(roomObj)
            
                client.onmessage = e => {
                    if(JSON.parse(e.data).target){
                        console.log(JSON.parse(e.data).target.name)
                    }
                    console.log("ENTRÖ")
                    console.log(e.data)
                    console.log(JSON.parse(e.data))
                    if(JSON.parse(e.data).action === "room-joined"){
                        dispatch({ type: 'SET_ROOM_ID', payload: JSON.parse(e.data).target.id })
                        dispatch({ type: 'SET_ROOM_NAME', payload: JSON.parse(e.data).target.name })
                        dispatch({ type: 'SET_CONNECTED_USERS', payload: JSON.parse(e.data) })
                    }
                    if(JSON.parse(e.data).action === "user-left"){
                        dispatch({ type: 'SET_USER_LEFT', payload: JSON.parse(e.data).sender.name + ', ' })
                    }
                    
                        if(JSON.parse(e.data).action === "send-message"){
                            dispatch({ type: 'SET_ALL_MESSAGES', payload: JSON.parse(e.data).message })
                            if(JSON.parse(e.data).message.indexOf(' joined') > -1){
                                let endIndex = JSON.parse(e.data).message.indexOf(' joined')
                                console.log(JSON.parse(e.data).message.slice(0, endIndex))
                                dispatch({ type: 'SET_CONNECTED_USERS', payload: JSON.parse(e.data).message.slice(0, endIndex) + ', ' , delete: false })
                            }
                            if("sender" in JSON.parse(e.data)){
                                if(JSON.parse(e.data).sender){
                                    console.log("-1-")
                                    dispatch({ type: 'SET_ALL_SENDERS', payload: JSON.parse(e.data).sender.name + ':' })
                                    dispatch({ type: 'SET_MESSAGES_POSITION', payload: JSON.parse(e.data).sender.id })
                                } else {
                                    console.log("-2-")
                                    dispatch({ type: 'SET_ALL_SENDERS', payload: ' ' })
                                    dispatch({ type: 'SET_MESSAGES_POSITION', payload: ' ' })
                                }
                            } else {
                                console.log("-3-")
                                dispatch({ type: 'SET_ALL_SENDERS', payload: ' ' })
                                dispatch({ type: 'SET_MESSAGES_POSITION', payload: ' ' })
                            }

                        }
                }
                client.onclose = e => {
                    console.log("//////////////////////")
                    console.log(e)
                    console.log("//////////////////////")
                    dispatch({ type: 'SET_SESION_CLOSED', payload: true })
                }
        }
    }, [client])

    useEffect(() => {
        if(roomObj){
            client.send(JSON.stringify(roomObj))
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [roomObj])

    


    const SOCKET_OBJ_2 = {
        "action": "send-message",
        "message": "",
        "target": {
          "id": "",
          "name": ""
        },
        "sender": {
          "id": 1,
          "name": "Carlos Reyes" // Sender es un usuario o el sistema
        }
      }

    const handleSendMessage = (message) => {
        reset()
        const messageObj = {...SOCKET_OBJ_2, ...message}
        messageObj.target.id = roomID
        messageObj.target.name = roomName
        client.send(JSON.stringify(messageObj))
    }

    useEffect(()=>{
        if(userLeft){
            console.log(userLeft)
            const array = [...connectedUsers]
            const index = array.indexOf(userLeft)
            if(index > -1){
                array.splice(index, 1)
                dispatch({ type: 'SET_CONNECTED_USERS', payload: array, delete: true})
                dispatch({ type: 'SET_USER_LEFT', payload: null }) 
            }
        }
    }, [userLeft])


//--------------------------------------------------
    
    const listMessages = allMessages.map((value, index) => {
        if(messagesPosition[index] == user_id){
            return <p className="messages-style messages-to-right" key={index}>{value}</p>
        } else if (typeof(messagesPosition[index]) === "number" && messagesPosition[index] !== user_id){
            return <p className="messages-style messages-to-left" key={index}>{value}</p>
        } else {
            return <p className="messages-style notification-style" key={index}>{value}</p>
        }
    })
    
    const listSenders = allSenders.map((value, index) => {
        
        if(messagesPosition[index] == user_id){
            return <p className="senders-style messages-to-right" key={(index + 1) * (-1)}>{value}</p>
        } else if (typeof(messagesPosition[index]) === "number" && messagesPosition[index] !== user_id){
            return <p className="senders-style messages-to-left" key={(index + 1) * (-1)}>{value}</p>
        } else {
            return <p className="senders-style " key={(index + 1) * (-1)}>{value}</p>
        }
    })


    useEffect(() => {
        if(messagesPosition){
            let newArr = []
            for(let i=0; i < listMessages.length; i++){
                newArr.push(listMessages[i])
                newArr.push(listSenders[i])
            }
            dispatch({ type: 'SET_CONVERSATION', payload: newArr })
        }
    }, [messagesPosition])



    return(
        <div className="room-container">
                { loading && <Loading /> }
                { roomName && <h1 className="room-title">{roomName}</h1> }
                { connectedUsers[0] ? 
                    <div className="connected">
                    <span className="connected">● </span>
                    <div>{connectedUsers}</div>
                    </div>
                    :
                    <div></div>
                } 
                <div className="box-chatting">
                    { conversation }
                </div>
                { roomID && 
                        <form className="message-form" onSubmit={handleSubmit((e) => handleSendMessage(e,reset))} >
                            <textarea placeholder="Message" {...register("message", { required: true })} ></textarea>
                            <button type="submit">Send</button>
                        </form>
                }
        </div>
    )
}

export default Chat