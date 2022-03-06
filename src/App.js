
import './App.css';
import { ResetStyle, GlobalStyle } from './components/globalstyle';
import { NavBar } from './components/NavBar/NavBar';
import { FindBus } from './components/FindBus/FindBus';
import { RealTimeBusInfo } from './components/RealTimeBusInfo/RealTimeBusInfo';
import { RealTimeStopInfo } from './components/RealTimeStopInfo/RealTimeStopInfo';
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
     //中文站名
    const [ twCityName, setTwCityName ] = useState('');
    
    //城市
    const [ cityName, setCityName ] = useState('');
    
    //路線資料
    const [ routeUID, setRouteUID ] = useState('');
    const [ roundName, setRoundName ] = useState({});
    const [ stopUID, setStopUID] = useState('');

    return (
    <div>
      <Router>
        <ResetStyle />
        <GlobalStyle />
        <NavBar />
        <Routes>
          <Route exact path="/" element={
            <FindBus
            routeUID={routeUID}
            cityName={cityName}
            setCityName={setCityName}
            twCityName={twCityName}
            setTwCityName={setTwCityName}
            setRouteUID={setRouteUID}
            setRoundName={setRoundName}
            setStopUID={setStopUID}
            />
          } />
          <Route exact path="/busroute/:routeTitle" element={
            <RealTimeBusInfo 
            twCityName={twCityName}
            cityName={cityName}
            routeUID={routeUID}
            roundName={roundName}
            />
          } />
          <Route exact path="/busstop/:routeTitle" element={
            <RealTimeStopInfo 
            twCityName={twCityName}
            cityName={cityName}
            stopUID={stopUID}
            />
          }/>
        </Routes>
      </Router>
    </div>
    );
}

export default App;
