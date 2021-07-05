import React, {useState} from 'react'
import {useForm} from 'react-hook-form';

const ChatRoom = ({room, users, messages, handleMsg, handleClose}) => {
    const {register, handleSubmit, reset} = useForm();
    const hour = new Date();


    const message = messages.map((msg, index)=>{
        return(
            <div className="messages-sub-container" key={index}>
                {   msg.sender && users[0] && msg.sender.name === users[0].name &&
                    <>
                    <p className="sender-style right-message">{msg.sender.name}</p>
                    <p className="message-style right-message">{msg.message}</p>
                    </>
                }
                {   msg.sender && users[0] && msg.sender.name !== users[0].name &&
                    <>
                    <p className="sender-style left-message">{msg.sender.name}</p>
                    <p className="message-style left-message">{msg.message}</p>
                    </>
                }
                {   !msg.sender && 
                    <>
                    <p className="message-style center-message">{msg.message}</p>
                    </>
                }
            </div>
        )
    })

    const connectedUsers = users.map((user, index) => {
        return(
            <span key={index}>{" " + user.name}</span>
        )
    })

    const connectedUsersFormat = () => {
        const newArr = [...connectedUsers]
        if(connectedUsers.length > 1){
            console.log("entró")
            for(let i=0; i < connectedUsers.length -1; i++){
                newArr.splice((i*2 + 1), 0, <span>,</span>)
            }
        }
        return newArr
    }

    return ( 
        <div className="chat-room-container">
            <div className="chat-room-header">
                <button className="close-button" onClick={() => handleClose(room)}><i className="fas fa-window-close"></i></button>
                <h2 className="room-title">{room.name}</h2>
                <div className="connected-style">
                    {users[0] && <span className="connected-icon">● </span> }
                    {connectedUsersFormat()}
                </div>
            </div>
            <div className="messages-container">
            {message}
            </div>
            <form className="form-messages" onSubmit={handleSubmit((e) => handleMsg(e, room, reset))}>
                <input style={{margin: "0"}} className="messages-input input-style" {...register("message", { required: true })}/>
                <button style={{padding: "0.5rem 0.8rem"}} className="button-style blue-color"><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>         
    )
}


export default ChatRoom