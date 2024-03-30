import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    stream: MediaStream;
    autoPlay?: boolean; // Make autoPlay prop optional
    muted?:boolean
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, autoPlay,muted }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);

    return <video ref={videoRef} autoPlay={autoPlay} muted={true}/>; // Pass autoPlay prop to video element
};
