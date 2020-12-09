import React, { useEffect, useState } from "react";
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import "../styles/WeekRecord.css";
import { getMaskHistory, putMaskHistory } from "../function/MaskHistoryApi";
import AngryFace from "../imgs/angry.png";
import MaskFace from "../imgs/mask.png";
import homeImg from "../imgs/home.png";

function WeekRecord() {
  const [maskHistory, setMaskHistory] = useState();
  const [noMask, setNoMask] = useState([]);
  const today = new Date();
  const todayText =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  useEffect(() => {
    getMaskHistory(todayText).then((res) => {
      if (res.statusCode == 200) {
        setMaskHistory(res.data.reverse());
      } else {
        console.log(res.statusCode);
      }
    });
  }, []);

  useEffect(() => {
    if (maskHistory) {
      setNoMask(
        maskHistory.map((i) => {
          if (i.outing > i.wearing) {
            return i.date;
          } else {
            return null;
          }
        })
      );
    }
  }, [maskHistory]);

  return (
    <div>
      <ReactWeeklyDayPicker
        dayCount={7}
        startDay={new Date().setDate(today.getDate() - 6)}
        todayText={"-오늘-"}
        unavailableText={"  "}
        beforeToday={true}
        unavailables={{
          dates: noMask, //unavailable dates list
        }}
      />

      <div className="rwdpText__Wrapper">
        <div>
          {maskHistory
            ? maskHistory.map((item, idx) => (
                // <div key={idx.toString()}>
                //   {item.outing !== 0
                //     ? item.outing + "중" + item.wearing + "번 착용"
                //     : null}
                // </div>
                <div className="faceEmoji__Wrapper" key={idx.toString()}>
                  {item.outing !== 0 ? (
                    item.outing > item.wearing ? (
                      <img src={AngryFace} alt="emoji"></img>
                    ) : (
                      <img src={MaskFace} alt="emoji" />
                    )
                  ) : (
                    <img src={homeImg} alt="emoji" />
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default WeekRecord;
