import { useEffect, useState, useRef } from "react";

import SeriesVideoItem from './series-video-item';
import SeriesChapterItem from './series-chapter-item';

import VideoItem from './video-item'
import VideoJS from './videojs'
import "plyr-react/plyr.css"


function SeriesTitlePage ({ currentSeries, videos, currentPlayer, setCurrentPlayer, currentVideo, setCurrentVideo }) {

    const playerRef = useRef(null);

    const thumbnailUrl = 'https://via.placeholder.com/160x90?text=Video+Thumbnail';

    const seriesVideos = videos.filter((video) => {
        return video.series && video.series.toString() === currentSeries._id.toString();
    })

    // useEffect(() => {
    //     setCurrentVideo(seriesVideos[0])
    //     console.log('SERIES VIDS -- ', seriesVideos[0])
    // }, [])
    


    return (
        <div className="series-title-page">
            <h1 className="series-title-title">{currentSeries.title}</h1>
            <div className="series-breakdown">
                <div id="video">
                    {/* <img id="thumbnail" src={thumbnailUrl} alt="Thumbnail here" /> */}

                    <p>{currentSeries.description}</p>
                </div>
                <div id="breakdown">
                    <h2>Series Content</h2>
                    {seriesVideos && seriesVideos.map((video, index) => (
                        <SeriesVideoItem key={index} video={video} index={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SeriesTitlePage;