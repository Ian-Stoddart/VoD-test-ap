


function SeriesChapterItem ({ chapter }) {

    const minutes = Math.floor(chapter.time / 60);
    const remainingSeconds = chapter.time % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return (
        <div className="series-chapter-item">
            <p>{chapter.description}</p>
            <p>{formattedMinutes}:{formattedSeconds}</p>
        </div>
    )
}

export default SeriesChapterItem