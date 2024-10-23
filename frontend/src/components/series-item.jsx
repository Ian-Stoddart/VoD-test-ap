import { useNavigate } from "react-router-dom";


function SeriesItem ({ item, setCurrentSeries }) {

    const navigate = useNavigate()

    const thumbnailUrl = 'https://via.placeholder.com/160x90?text=Video+Thumbnail';


    const handleClick = () => {
        setCurrentSeries(item)
        navigate('series-page')
    }

    return (
        <div className="series-item" onClick={handleClick} >
            <img src={thumbnailUrl} alt="Thumbnail here" />
            <div className="series-item-info-box">
                <div className="series-item-info-top">
                    <h3 className="series-title">{item.title}</h3>
                    <div className="series-disc">{item.description}</div>
                </div>
                <div className="series-item-info-bottom">
                    <p>Number of videos: 5</p>
                </div>
            </div>
        </div>
    )
}

export default SeriesItem;