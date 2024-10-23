import Plyr from 'plyr-react';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import VideoItem from './video-item'
import VideoJS from './videojs'
import "plyr-react/plyr.css"

function HomePage({ user, videos, setVideos, currentPlayer, setCurrentPlayer, currentVideo, setCurrentVideo }) {

    const [currentPreSets, setCurrentPreSets] = useState();
    const [showButtons, setShowButtons] = useState(false);
    const playerRef = useRef(null);

    let navigate = useNavigate();


    if (!videos) {
        useEffect(() => {
            async function fetchVideos() {
                const { data } = await axios.get('http://127.0.0.1:8000/api/videos/')
                setVideos(data)
            }
            fetchVideos()
        }, [])
    }


    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });
      };


    return (
        <div>
            <div className="vid-list" >
                {videos.map((video, index) => (
                    <VideoItem
                    key={index}
                    video={video}
                    setCurrentVideo={setCurrentVideo}
                    currentPlayer={currentPlayer}
                    setShowButtons={setShowButtons}
                    setCurrentPreSets={setCurrentPreSets}
                    />
                ))}
                <button className="login-link" onClick={() => navigate('/')}>Back to Login/Logout page</button>
            </div>
            { currentVideo &&  (
                <div className="player">
                    <h2>{ currentVideo.title }</h2>
                    <VideoJS 
                    options={{
                        autoplay: false,
                        controls: true,
                        responsive: true,
                        fluid: true,
                        controlBar: {
                            pictureInPictureToggle: true
                        },
                        sources: [{ src: currentVideo.video_file, type: 'video/mp4' }],
                      }} 
                    onReady={handlePlayerReady}
                    currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
                    currentPreSets={currentPreSets}
                    showButtons={showButtons}
                    currentVideo={currentVideo}
                    user={user}
                    />
                </div>
            )}
            {/* <Link to={'diff-page'}>DIFFERENT PAGE</Link> */}
        </div>
    )
}

export default HomePage