import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useForm } from "react-hook-form"

const Application = () => {
    const [client, setClient] = useState(null)
    const [roomID, setRoomID] = useState(null)
    const [roomName, setRoomName] = useState(null)
    const [allMessages, setAllMessages] = useState([])
    const [allSenders, setAllSenders] = useState([])
    const [conversation, setConversation] = useState([])

    const {handleSubmit, register, reset} = useForm()

    const dispatch = useDispatch()
    const login_item = useSelector(state => state.login_item)

    
    useEffect(() => {
        const encoded = encodeURI(login_item)
        if(login_item){
            setClient(new W3CWebSocket('wss://acapp.herokuapp.com/ws', ['token', encoded]))
        }
    }, [login_item])

    
//------------------------------------------------
    const SOCKET_OBJ = {
        "action": "join-room",
        "message": "Mario Kart",
        "target": null,
        "sender": {
        "id": 1,
        "name": "Carlos Reyes" // Sender es un usuario o el sistema
        }
    }    

    useEffect(()=>{
        if(client){
            client.onopen = () => {
                console.log("Open")
                client.send(JSON.stringify(SOCKET_OBJ))
                client.onmessage = e => {
                    if(JSON.parse(e.data).action === "room-joined"){
                        setRoomID(JSON.parse(e.data).target.id)
                        setRoomName(JSON.parse(e.data).target.name)
                    }
                    if(JSON.parse(e.data).action === "send-message"){
                        setAllMessages(prev => [JSON.parse(e.data).message, ...prev])
                        if("sender" in JSON.parse(e.data)){
                            if(JSON.parse(e.data).sender){
                                setAllSenders(prev => [JSON.parse(e.data).sender.name + ':', ...prev])
                            } else {
                                setAllSenders(prev => [' ', ...prev])
                            }
                        } else {
                            setAllSenders(prev => [' ', ...prev])
                        }
                        
                    }
                    console.log(JSON.parse(e.data))
                }
            }
        }
    }, [client])


    const SOCKET_OBJ_2 = {
        "action": "send-message",
        "message": "Hola, profe",
        "target": {
          "id": "a398a164-d05c-46a2-b710-66cc6dc6d060",
          "name": "test"
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
        if(allMessages){
            console.log(allMessages)
        }
    }, [allMessages])


//--------------------------------------------------
    
    const listMessages = allMessages.map((value, index) => {
        return <p className="messages-style" key={index}>{value}</p>
    })
    
    const listSenders = allSenders.map((value, index) => {
        return <p className="senders-style" key={(index + 1) * (-1)}>{value}</p>
    })


    useEffect(() => {
        if(allSenders){
            let newArr = []
            for(let i=0; i < listMessages.length; i++){
                newArr.push(listMessages[i])
                newArr.push(listSenders[i])
            }
            console.log("-----------------")
            console.log(listSenders)
            console.log(listMessages)
            console.log("-----------------")
            setConversation(newArr)
        }
    }, [allSenders])


    /* const listConversation = () => {
        let newArr = [];
        for(let i=0; i < listMessages.length; i++){
            newArr.push(listSenders[i])
            newArr.push(listMessages[i])
        }
        console.log(newArr)
        return <p className="messages-style" >asdsad</p>
    } */

    return(
        <div>
            <h3>ROOMS:</h3>
            <div className="room-container">
                { roomName && <h1>{roomName}</h1> }
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
        </div>
    )
}

export default Application




/* data: "{\"action\":\"user-join\",\"message\":\"\",\"target\":null,\"sender\":{\"name\":\"Profe Charly\",\"id\":1}}"
data: "{\"action\":\"room-joined\",\"message\":\"\",\"target\":{\"name\":\"test\",\"id\":\"37c5566f-fcaa-4469-8a5f-557269a12c90\",\"private\":false},\"sender\":null}"
data: "{\"action\":\"send-message\",\"message\":\"Profe Charly joined the room\",\"target\":{\"name\":\"test\",\"id\":\"37c5566f-fcaa-4469-8a5f-557269a12c90\",\"private\":false},\"sender\":null}" */