import {v4 as uuidV4} from "uuid"
import {Socket} from "socket.io"


const rooms:Record<string,string[]> = {}

interface IRoomParams{
    roomId:string,
    peerId:string,

}

export const roomHandler = (socket:Socket) =>{

    const createRoom = () =>{
        const roomId = uuidV4();
        rooms[roomId] = []
        socket.emit("room-created",{roomId})
        console.log("User Created The Room")
    }


const joinRoom = ({roomId, peerId}: IRoomParams)=>{
    if(rooms[roomId]){

        socket.join(roomId)

    rooms[roomId].push(peerId)

    socket.to(roomId).emit("user-joined",{peerId})

    socket.emit("get-users",{
        roomId,
        participants:rooms[roomId]
    })


    console.log("User Joined The Room with id: "+roomId+" and peerId: "+peerId)


    }

    socket.on("disconnect",()=>{
       console.log("user left the room "+peerId)
       leaveRoom({peerId,roomId})
    })

}

const leaveRoom = ({peerId, roomId}:IRoomParams) => {
    try{
        rooms[roomId] = rooms[roomId].filter(id=> id !== peerId)

    }
    catch(e){
        console.error(e)
    }
        socket.to(roomId).emit("user-disconnected",peerId)
}


    socket.on("create-room",createRoom)

    socket.on("join-room",joinRoom)

}