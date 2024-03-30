import socketIOClient from "socket.io-client";
import React, { createContext,useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import {v4 as uuidV4} from "uuid";
import { peersReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {

    
    const [me, setMe] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>()
    const [peers, dispatch] = useReducer(peersReducer,{})
    const [ScreenSharingId, setScreenSharingId] = useState<string>();


    const navigate = useNavigate();
    
const enterRoom = ({roomId}: {roomId:"string"}) =>{
navigate(`/room/${roomId}`)
}
const getUsers = ({participants}:{participants:string[]}) =>{
console.log({participants})
}

const removePeer = (peerId:string) =>{
dispatch(removePeerAction(peerId))
}

const switchStream = (stream: MediaStream) =>{
    setStream(stream)
    setScreenSharingId(me?.id||"")

    Object.values(me?.connections||{}).forEach((connection:any) => {
        const videoTrack = stream?.getTracks().find(track => track.kind === "video");
        connection[0].peerConnection.getSenders()[1].replaceTrack(videoTrack).catch((err:any)=>console.error(err))
      });

}


const shareScreen = () => {
    if (ScreenSharingId) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
    }
  
   


  };


/*
  const shareScreen = () => {
    if (ScreenSharingId) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
        Object.values(peers).forEach((peer: any) => {
          const call = me?.call(peer.peerId, stream);
          if (call) {
            call.on("stream", (peerStream: MediaStream) => {
              dispatch(addPeerAction(peer.peerId, peerStream));
            });
          }
        });
      }).catch((error) => {
        console.error("Error accessing screen share:", error);
      });
    } else {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
        setStream(stream);
        Object.values(peers).forEach((peer: any) => {
          const call = me?.call(peer.peerId, stream);
          if (call) {
            call.on("stream", (peerStream: MediaStream) => {
              dispatch(addPeerAction(peer.peerId, peerStream));
            });
          }
        });
      }).catch((error) => {
        console.error("Error accessing screen share:", error);
      });
    }
  };
  */




/*
npm install peer -g
peerjs --port 9000 --key peerjs --path /server
*/


useEffect(()=>{
const meId = uuidV4();
const peer = new Peer(meId,{
    host: "localhost",
    port: 9000,
    path:"/server"
})
setMe(peer)

try{
navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream) => {
setStream(stream)
})

}catch(error){
    console.error(error)
}

ws.on("room-created",enterRoom)//Room created from the server after the user emit create-user
ws.on("get-users",getUsers)

ws.on("user-disconnected",removePeer)

},[])
   

useEffect(()=>{
if(!me) return;
if(!stream) return;

ws.on("user-joined", ({peerId})=>{
const call = me.call(peerId, stream)
call.on("stream",(peerStream)=>{
    dispatch(addPeerAction(peerId,peerStream))
})

})

me.on("call", (call)=>{
call.answer(stream)
call.on("stream",(peerStream)=>{
    dispatch(addPeerAction(call.peer,peerStream))
})
})

},[me, stream])



    return (
        <RoomContext.Provider value={{ ws,me,stream,peers,shareScreen }}>
            {children}
        </RoomContext.Provider>
    );
};
