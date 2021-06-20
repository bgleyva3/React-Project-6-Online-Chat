import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'

const RoomInput = () => {
    const dispatch = useDispatch()
    const {handleSubmit, register, reset} = useForm()


    const SOCKET_OBJ = {
        "action": "join-room",
        "message": "Mario Kart",
        "target": null,
        "sender": {
        "id": 1,
        "name": "Carlos Reyes" // Sender es un usuario o el sistema
        }
    } 


    const handleEnterRoom = (e) => {
        reset()
        SOCKET_OBJ.message = e.message
        dispatch({ type: 'SET_ROOM_OBJ', payload: SOCKET_OBJ })
    }

    return(
        <form onSubmit={handleSubmit((e) => handleEnterRoom(e,reset))} >
            <input placeholder="Room name" {...register("message", { required: true })} ></input>
            <button type="submit">Enter</button>
        </form>
    )
}

export default RoomInput