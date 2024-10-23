import { format, addSeconds } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CurrentListItem({ video_id, setResume, userVideo }) {

    const [show, setShow] = useState(true)

    const navigate = useNavigate();
    // const thumbnailUrl = userVideo.thumnail;
    const thumbnailUrl = 'https://via.placeholder.com/160x90?text=Video+Thumbnail';

    const formattedDate =format(new Date(userVideo.date_time), 'MMMM do, yyyy h:mm a')
    
    // Convert progress (in seconds) to a more user-friendly format
    function convertTime (timeInSecs) {
        const date = addSeconds(new Date(0), timeInSecs);
        return timeInSecs >= 3600
            ? format(date, 'H:mm:ss')
            : format(date, 'm:ss')
    };

    // // 'onClick' functions:
    const delItem = () => {
        setShow(!show)
    }

    const mouseEnter = () => {
        setResume(userVideo)
    }

    
    const convertedTime = convertTime(userVideo.progress);

    return (
        <div className="list-item">
            {show ? 
            <div className="show" onMouseEnter={mouseEnter} >
                <div className="list-item-info" onClick={() => navigate('player')} >
                    <div className="thumb">
                        <img src={thumbnailUrl} alt="Thumbnail here" />
                    </div>
                    <div className="current-info">
                        <h1 id="current-h">{userVideo.title}</h1>
                        <h3 id="current-h">{userVideo.description}</h3>
                        <div className="other-info">
                            <p>Progress: {convertedTime}</p>
                            <p>Date last watched: {formattedDate}</p>
                        </div>
                    </div>
                </div>
                <div className="x" onClick={delItem} >X</div>
            </div>
            :
            <div></div>
            }
        </div>
    )
}

export default CurrentListItem