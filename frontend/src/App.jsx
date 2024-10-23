import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import BasePage from './base-page'
import HomePage from './components/home-page'
import DifferentPage from './components/different-page'
import Login from './login'
import CurrentVideoItem from './components/current-videos'
import SeriesTitlePage from './components/series-title-page'

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userVideos, setUserVideos] = useState();
  const [resume, setResume] = useState();
  const [videos, setVideos] = useState([]);
  const [series, setSeries] = useState([]);
  const [currentSeries, setCurrentSeries] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  return ( 
  <Router>
    <Routes>
      <Route path='/' element={ <BasePage/> } />
      <Route index element={ <Login
        videos={videos} setVideos={setVideos}
        user={user} setUser={setUser} 
        loggedIn={loggedIn} setLoggedIn={setLoggedIn}
        userVideos={userVideos} setUserVideos={setUserVideos}
        resume={resume} setResume={setResume}
        series={series} setSeries={setSeries}
        currentSeries={currentSeries} setCurrentSeries={setCurrentSeries}
        /> } />
      <Route path='diff-page' element={ <DifferentPage/> } />
      <Route path='home' element={ <HomePage 
        user={user} 
        videos={videos} setVideos={setVideos}
        currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}
        currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
        /> } />
      <Route path='player' element={ <CurrentVideoItem resume={resume} /> } />
      <Route path='series-page' element={ <SeriesTitlePage 
        currentSeries={currentSeries} 
        videos={videos} 
        user={user}
        currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}
        currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
        /> } />
    </Routes>
  </Router>
  )
}

export default App
