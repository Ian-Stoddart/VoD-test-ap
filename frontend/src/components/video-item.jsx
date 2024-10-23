

function VideoItem({ video, setCurrentVideo, currentPlayer, setCurrentPreSets, setShowButtons }) {

    function handleClick() {
        
        setCurrentVideo(video)

        const bookmarks = [];
        let i = 1;

        while (`pre_set${i}` in video) {
            const timeKey = `pre_set${i}`;
            const descKey = `pre_set${i}_desc`;
      
            bookmarks.push({
              time: video[timeKey],
              description: video[descKey]
            });
      
            i++;
        }

        setCurrentPreSets(bookmarks);
        setShowButtons(true);
        if (currentPlayer) {
            const stopTime = currentPlayer.currentTime();
            console.log('PREVIOUS VIDEO STOPPPED AT: ', stopTime, 'seconds');

        }
    }

    return (
        <div className="video-item" onClick={handleClick}>
            <h1>{ video.title }:</h1>
            <h2>{ video.description }</h2>
        </div>
    )
}

export default VideoItem