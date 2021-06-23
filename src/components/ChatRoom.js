import React, {useState} from 'react'
import {useForm} from 'react-hook-form';

const ChatRoom = ({room, users, messages, handleMsg}) => {
    const {register, handleSubmit, reset} = useForm();
    const hour = new Date();
    /* console.log("-----users-----")
    console.log(users) */


    const message = messages.map((msg, index)=>{
        console.log(msg)
        console.log(users)
        return(
            <div className="messages-sub-container" key={index}>
                {   msg.sender && msg.sender.name === users[0].name &&
                    <>
                    <p className="sender-style right-message">{msg.sender.name}</p>
                    <p className="message-style right-message">{msg.message}</p>
                    </>
                }
                {   msg.sender && msg.sender.name !== users[0].name &&
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
            //user.name
        )
    })

    const connectedUsersFormat = () => {
        console.log(connectedUsers)
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
        <div>
            <div>
                <h2>{room.name}</h2>
                <div>
                    {users[0] && <span>● </span> }
                    {connectedUsersFormat()}
                </div>
            </div>
            <div>
            {message}
            </div>
            <form onSubmit={handleSubmit((e) => handleMsg(e, room, reset))}>
                <input {...register("message", { required: true })}/>
                <button>SEND</button>
            </form>
        </div>         
    )
}

export default ChatRoom