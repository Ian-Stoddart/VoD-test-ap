

function SuggestionsList ({ suggest }) {

    const thumbnailUrl = 'https://via.placeholder.com/160x90?text=Video+Thumbnail';

    return (
        <div className="sugest-item">
            <img src={thumbnailUrl} alt="Thumbnail here" />
            <h3>{suggest.title}</h3>
        </div>
    )
}

export default SuggestionsList;