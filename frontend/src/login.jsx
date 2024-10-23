import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CurrentVideoItem from './components/current-videos'
import CurrentListItem from './components/current-list-item'
import SuggestionsList from './components/suggestions-list'
import SeriesItem from './components/series-item'


function Login ({ 
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        userVideos,
        setUserVideos,
        setResume,
        resume,
        videos,
        setVideos,
        series,
        setSeries,
        currentSeries,
        setCurrentSeries }) {
    

    let navigate = useNavigate();    

    const [sugestionList, setSugestionList] = useState();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [findSuggestions, setFindSuggestions] = useState(true);
    const [signup, setSignup] = useState(false);
   
    
    useEffect(() => {
        async function fetchVideos() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/videos/')
            setVideos(data)
        }

        async function fetchSeries() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/series/')
            setSeries(data)
        }
        fetchVideos();
        fetchSeries();
    }, [])
    
    // Signup or login toggle
    const handdleToggle = () => {
        setSignup(!signup)
    }

    //  Get currently watching videos with the progresstion time, & date watched added
    const logIn = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            user: user
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setUserVideos(response.data)
        setLoggedIn(!loggedIn)
    };
    
    // Simple API to trigger B/E to migrate Redis data to the DB
    const logout = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/logout/', {
            user: user
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setLoggedIn(!loggedIn)
    };
    

    // // Sorting the details from the tags to retieve suggested videos:
    // function to tally each tag's occurances.
    function sortTagArrays(arr) {
        const counts = {};
        let runs = 0;
        arr.forEach(function(value) {
            if (counts[value]) {
                counts[value]++;
            } else {
                counts[value] = 1;
                if (runs == 0) {
                    counts[value]++;
                };
            }
            runs++;
        });
        return counts;
    }

    if (loggedIn && findSuggestions){
        //  Create an object of the 3 last watched videos's tags grouped by tag title.
        const tagObject = {
            genre: userVideos.slice(0, 3).map(video => [video.genre]),
            videoLength: userVideos.slice(0, 3).map(video => [video.video_length]),
            type: userVideos.slice(0, 3).map(video => [video.type])
        };

        // Create object of with each tag title as key and their scored occurances array as values.
        const scoredTagObject = {};
        
        for (const [key,value] of Object.entries(tagObject)) {
            scoredTagObject[key] = sortTagArrays(value)
        };
        console.log(scoredTagObject, ' --- SCORED TAG OBJ');


        // // Sort through the video list and find the 3 recommended ones:
        const suggestions = [];
        const currentIds = [];
        for(let i = 0; i < userVideos.length; i++) {
            currentIds.push(userVideos[i]._id)
        }
        const removedCurretnVideos = videos.filter((video) => !currentIds.includes(video._id))
        const sortedByGenre = removedCurretnVideos.filter((video) => video.genre == Object.keys(scoredTagObject.genre)[0]);
        const sortedByType = sortedByGenre.filter((video) => video.type == Object.keys(scoredTagObject.type)[0]);
        const sortedByLength = sortedByType.filter((video) => video.video_length = Object.keys(scoredTagObject.videoLength)[0]);
        
        if (sortedByLength.length > 1) {
            suggestions.push(sortedByLength[0], sortedByLength[1])
        } else if (sortedByLength.length > 0) {
            suggestions.push(sortedByLength[0])
            if (sortedByType.length > 1) {
                const removeSuggested = sortedByType.filter((video) => video._id !== sortedByLength[0]._id);
                suggestions.push(removeSuggested[0]);
            }
        }
        if (suggestions.length >= 2) {
            const secondGenre = removedCurretnVideos.filter((video) => video.genre == Object.keys(scoredTagObject.genre)[1]);
            suggestions.push(secondGenre[0]);
        }
        setSugestionList(suggestions);
        setShowSuggestions(!showSuggestions);
        setFindSuggestions(false);
    }




    return (
        <div className="login">
            <div className="login-top">
                <div className="login-box">
                    {!signup ?
                        <div className="toggle">
                            <label >Name</label>
                            <input onChange={(e) => setUser(e.target.value)} type="text" />
                            <label >Password</label>
                            <input type="password" />
                        </div>
                        :
                        <div className="toggle">SIGN UP FORM...
                        </div>
                    }
                    <div className="login-signup">
                        {loggedIn ?
                            <button className="out" onClick={logout}>Log Out</button>
                            :
                            <button className="in" onClick={logIn}>Login</button>
                        }
                        <button onClick={handdleToggle}>Sign-up</button>
                    </div>
                </div>
                <div className="home-link">
                    <button className="home-btn" onClick={() => navigate('home')}>See Video Library</button>
                </div>
                {loggedIn ?
                    <h2 className="welcome">Welcome back { user }, here are your current videos...</h2>
                    :
                    null
                }
            </div>
            {userVideos && (
                <div className="current-videos">
                    {userVideos.map((userVideo, index) => (
                        <CurrentListItem
                            key={index}
                            setResume={setResume}
                            userVideo={userVideo}
                            video_id={userVideo._id} />
                        ))}
                        <h2 className="sug-h1">Suggested next videos...</h2>
                </div>
            )}
            {showSuggestions && (
                <div className="suggested">
                    {sugestionList.map((suggest, index) => (
                        <SuggestionsList
                            key={index}
                            suggest={suggest} />   
                    ))}
                </div>
            )}
            <div className="series-title">
                <h2 className="sug-h2">Try one of our learning series...</h2>
            </div>
            {loggedIn  && (
                <div className="series-login-list">
                    {series.map((item, index) => (
                        <SeriesItem
                            key={index}
                            item={item}
                            setCurrentSeries={setCurrentSeries} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Login