import React from 'react';
import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import axios from "axios";

// import 'videojs-pip';

export const VideoJS = (props) => {

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [startTime, setStartTime] = useState(0)

  const {options,
    onReady, 
    setCurrentPlayer, 
    currentPlayer, 
    currentPreSets, 
    showButtons,
    currentVideo,
    user
  } = props;

  // mock data to mimic a logged in user
  const userName = user
  const company = 'Arms-2-U Weapons exporters'


  // Heatbeat function
  async function sendHeartBeat() {
    let videoTime;
    if(playerRef.current) {
      videoTime = playerRef.current.currentTime();
    }
    const now = Date.now()
    console.log('VIDEO TIME ---- ', videoTime)
    const { data } = await axios.post('http://127.0.0.1:8000/api/videos-update/', {
      userName: userName,
      // company: company,
      // videoName: currentVideo.title,
      videoId: currentVideo._id,
      videoPlayTime: videoTime,
      dateInMils: now,
      // date: new Date(now).toLocaleDateString(),
      // time: new Date(now).toLocaleTimeString()
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('DATA RESPONSE -- ', data)
  }


  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);

        setCurrentPlayer(player)

      
        // // Event Listeners:
        playerRef.current.on("play", () => {
            console.log("VIDEO PLAYING")
        })

        playerRef.current.on("pause", () => {
            const pauseTime = playerRef.current.currentTime();
            console.log("VIDEO PAUSED AT: ", pauseTime)
        })
        
      });

    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources[0]);
    }
  }, [options, videoRef]);


  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  // Try: grabbing data when frontend is abrubtly stopped
  useEffect(() => {
    const handleBeforeUnload = () => {
        if (currentPlayer) {
          const stopTime = currentPlayer.currentTime();
          console.log('Video stopped at', stopTime, 'seconds');

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
        }
    };
  }, [])


  // Navs to predetermined video moments
  const handleTimestampClick = (time) => {
    setStartTime(time); 

    if (currentPlayer) {
      currentPlayer.currentTime(time);
      currentPlayer.play();
    }
  };

  
  // Heartbeat 
  useEffect(() => {
    let intervalId;

    sendHeartBeat()

    intervalId = setInterval(sendHeartBeat, 5000)

    return () => clearInterval(intervalId)
  }, [currentVideo])



  return (
    <div className="player-box">
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
      <div className="btn-box">
        {showButtons ? (
          <div className="pre-set-buttons">
            {currentPreSets
              .filter((preSet) => preSet.description)
              .map((preSet, index) => (
                <div
                  className="button"
                  onClick={() => handleTimestampClick(preSet.time)}
                  key={index}
                >
                  <h1>{preSet.description}:</h1>
                  <h3>{preSet.time} seconds</h3>
                </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}


export default VideoJS;