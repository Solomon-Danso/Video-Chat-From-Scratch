import { useParams } from 'react-router-dom';
import '../App.css';
import { useContext, useEffect } from 'react';
import { RoomContext } from '../context/RoomContext';
import { VideoPlayer } from '../components/VideoPlayer';
import { PeerState } from '../context/peerReducer';

export const Room = () =>{

    const {id} = useParams();
    const {ws,me,stream,peers} = useContext(RoomContext)

    useEffect(()=>{
      if(me)  ws.emit("join-room",{roomId:id, peerId:me._id})
    },[id,me,ws])

    return (<>
    <div className="video-grid">
        <VideoPlayer stream={stream} autoPlay muted={true}/>
        {
            Object.values(peers as PeerState).map(peer=>(
            <VideoPlayer stream={peer.stream} autoPlay muted={true}/>
            ))
        }
    </div>
    
    </>)
}