import React from 'react';
import IsMaskOn from './IsMaskOn';
import WeekRecord from './WeekRecord';
import CovidStatistics from './CovidStatistics';
import News from './News';
import '../styles/Home.css';

function Home(){
    return (
    <div className="Page__Wrapper">
        <div className="Row1">       
            <IsMaskOn />    
        </div>
        <div className="Row2">       
            <WeekRecord  />
        </div>
       <div className="Row3">
           <CovidStatistics />
           <News />
       </div>
    </div>);
}

export default Home;