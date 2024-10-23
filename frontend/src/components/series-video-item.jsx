import { useState } from 'react'

import SeriesChapterItem from './series-chapter-item';


function SeriesVideoItem ({ video, index }) {



    const chapters = [];
    let i = 1;

    while (`pre_set${i}` in video) {
        const timeKey = `pre_set${i}`;
        const descKey = `pre_set${i}_desc`;
        
        if (timeKey !== null) {
            chapters.push({
            time: video[timeKey],
            description: video[descKey]
            });
        }
        i++;
    }
    const formatedChapters = chapters.filter((chapter) => chapter.time !== null)

    return (
        <div className="series-video-item">
            <h3>{index + 1} - {video.title}</h3>
            {formatedChapters && formatedChapters.map((chapter, index) => (
                <SeriesChapterItem key={index} chapter={chapter} />
            ))}
        </div>
    )
}

export default SeriesVideoItem