import {useContext} from "react"
import {RoomProvider,RoomContext} from "../context/RoomContext"

export const Create: React.FC = () =>{

    const {ws} = useContext(RoomContext)

    const createRoom = () =>{
        ws.emit("create-room")
    }


    return (
        <button onClick={createRoom} className="button">Start new meeting</button>
    )
}