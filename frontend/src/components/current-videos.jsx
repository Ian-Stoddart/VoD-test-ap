import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';


function CurrentVideoItem ({ resume }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    const startTime = resume.progress;
    const videoSrc = resume.video_file;

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
      }, []);

    useEffect (() => {
        if (isMounted && videoRef.current && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                width: 640,
                height: 360,
                sources: [{ src: videoSrc, type: 'video/mp4' }],
            });

            playerRef.current.on('loadedmetadata', () => {
                if (startTime && typeof startTime == 'number') {
                    playerRef.current.currentTime(startTime)
                }
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        }
    }, [isMounted, videoSrc, startTime]);

    return (
        <div className="current-item">
            <div data-vjs-player>
                <video ref={videoRef} className="video-js" ></video>
            </div>
            <div className='tags'>
                <div className="tag">#{resume.genre}</div>
                <div className="tag">#{resume.video_length}</div>
                <div className="tag">#{resume.type}</div>
            </div>
        </div>
    )
}

export default CurrentVideoItem