import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import ChatRoom from './ChatRoom.js'
const Application = ({register, handleSubmit, reset}) => {
  const history = useHistory() 
  const [client, setClient] = useState(null);
  const [users, setUsers] = useState([]);
  const [roomsArr, setRoomsArr] = useState([]);
  const [roomFormCenter, setRoomFormCenter] = useState(true)
  const accessToken = useSelector(state => state.accessToken)
  const dispatch = useDispatch();


  useEffect(() => {
    if (accessToken) {
      const encoded = encodeURI(accessToken)
      setClient(
        new WebSocket('wss://acapp.herokuapp.com/ws', ['token', encoded])
      )
    }
    dispatch({type: 'problems-message', payload: false})
  }, [accessToken])
  

  // [client, roomsArr] dependencies
  useEffect(() => {
    if (client) {
      
      //--------------------------------------------
      const handleChatMsg = msgObj => {
        /* console.log(roomsArr)
        console.log(msgObj) */
        let room = {};
        if(msgObj.target){
          console.log("-1-")
          room = findRoom(msgObj.target.id)
        } else {
          console.log("-2-")
          /* console.log(roomsArr)
          console.log(Object.keys(roomsArr)[0]) */
          room = roomsArr[Object.keys(roomsArr)[0]]
        }
        console.log(room)
        if(room){
          room.messages = [msgObj, ...room.messages]
        }
        console.log(room.messages)
        setRoomsArr(prev =>
          prev.map(value => {
            if (value.name === room.name) {
              return room
            }

            return value
          })
        )
      }

      const findRoom = roomId => {
        for (let i = 0; i < roomsArr.length; i++) {
          if (roomsArr[i].id === roomId) {
            return roomsArr[i]
          }
        }
      }

      //---------------------------------------------

      const handleUserJoined = msg => {
        setUsers(prev => [...prev, msg.sender])
      }

      const handleUserLeft = msg => {
        console.log("--------------------------")
        console.log(msg)
        console.log("--------------------------")
        setUsers(prev => prev.filter(value => value.id !== msg.sender.id))
        handleChatMsg({
          action: "send-message", 
          message: msg.sender.name + " left",
          sender: null,
          target: null
        })
      }

      const handleRoomJoined = obj => {
        setRoomsArr(prev => [
          {
            name: obj.target.name,
            id: obj.target.id,
            private: obj.target.private,
            messages: []
          }, ...prev])
      }

      //client.onopen = () => {}

      client.onmessage = e => {
        let data = e.data
        let msg = JSON.parse(data)
        console.log(JSON.parse(data))
        switch (msg.action) {
          case 'send-message':
            handleChatMsg(msg)
            break
          case 'user-join':
            handleUserJoined(msg)
            break
          case 'user-left':
            handleUserLeft(msg)
            break
          case 'room-joined':
            handleRoomJoined(msg)
            break
          default:
            break
          }
            
      }

      client.onclose = (e) => {
        console.log(e)
        dispatch({type: 'show-onclose-message'})
        history.push('/')
      }
    }
  }, [client, roomsArr])


  const sendMessage = (e, room, reset) => {
    console.log(e)
    console.log(room)
    reset()
    client.send(
      JSON.stringify({
        action: 'send-message',
        message: e.message,
        target: {
          id: room.id,
          name: room.name
        }
      })
    )
  }

  const closeChat = (room) => {
    console.log(room)
    const arrDestructure = [...roomsArr]
    const findRoom = objRoom => objRoom.name === room.name
    const deleteIndex = arrDestructure.findIndex(findRoom)
    console.log(deleteIndex)
    arrDestructure.splice(deleteIndex, 1)
    setRoomsArr(arrDestructure)
  }
  
  const joinRoom = (e) => {
    reset()
    setRoomFormCenter(false)
    client.send(JSON.stringify({ action: 'join-room', message: e.roomInput }))
  }


  const handleLeave = () => {
    dispatch({type: 'clear-all'})
    /* if (!accessToken) {
      history.push('/');
    } */
  }


  const list = roomsArr.map((room) => {
    console.log(roomsArr)
    return(
    <ChatRoom
      client={client}
      room={room}
      users={users}
      messages={room.messages}
      handleMsg={sendMessage}
      handleClose={closeChat}
      key={room.id}
    />
  )})

  return (
      <div className="background-application">
        <div className="header-application shadow-bottom">
          <p className="hello-text">{users[0] && "Hello, " + users[0].name}</p>
          <button style={{padding: "0.5rem 0.8rem"}} className="button-style red-color" type='button' onClick={handleLeave}><i className="fas fa-sign-out-alt"></i></button>
        </div>
        {
          roomFormCenter ? 
            <div className="room-form-container">
              <form className="room-form centered-form shadow-bottom" onSubmit={handleSubmit(joinRoom)}> 
                <input style={{margin: "0"}} className="input-style" id="sesion" placeholder="Enter Room Name" {...register('roomInput', {required: true})}/>
                <button style={{margin: "0"}} className="text-button green-color no-margin" type='submit' >Join</button>
              </form>
            </div>
            :
            <form className="room-form" onSubmit={handleSubmit(joinRoom)}> 
              <input style={{margin: "0"}} className="input-style" id="sesion" placeholder="Enter Room Name" {...register('roomInput', {required: true})}/>
              <button style={{margin: "0"}} className="text-button green-color no-margin" type='submit' >Join</button>
            </form>
        }
        <div className="chat-room-granpa">
          {list}
        </div>
      </div>
  )
}

export default Application