import { useParams } from 'react-router-dom';
import '../App.css';
import { useContext, useEffect } from 'react';
import { RoomContext } from '../context/RoomContext';

export const Room = () =>{

    const {id} = useParams();
    const {ws} = useContext(RoomContext)

    useEffect(()=>{
        ws.emit("join-room",{roomId:id})
    },[id])

    return (<>RoomId:{id} </>)
}