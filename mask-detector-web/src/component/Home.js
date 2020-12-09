import React from "react";
import IsMaskOn from "./IsMaskOn";
import WeekRecord from "./WeekRecord";
import CovidStatistics from "./CovidStatistics";
import News from "./News";
import "../styles/Home.css";

function Home() {
  return (
    <div className="Page__Wrapper">
      <div className="LeftSide">
        <IsMaskOn />
        <WeekRecord />
        <CovidStatistics />
      </div>
      <div className="RightSide">
        <News />
      </div>
      {/* <div className="Row1">
      </div>
      <div className="Row2">
      </div>
      <div className="Row3">
      </div> */}
    </div>
  );
}

export default Home;
