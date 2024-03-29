import {v4 as uuidV4} from "uuid"
import {Socket} from "socket.io"



export const roomHandler = (socket:Socket) =>{

    const createRoom = () =>{
        const roomId = uuidV4();
        
        socket.emit("room-created",{roomId})
        console.log("User Created The Room")
    }


const joinRoom = ({roomId}: {roomId:string})=>{
    socket.join(roomId)
    console.log("User Joined The Room with id: "+roomId)
}


    socket.on("create-room",createRoom)

    socket.on("join-room",joinRoom)

}