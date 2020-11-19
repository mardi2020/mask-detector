import React, { useEffect, useState } from "react";
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import "../styles/WeekRecord.css";
import { getMaskHistory, putMaskHistory } from "../function/MaskHistoryApi";

function WeekRecord() {
  const [maskHistory, setMaskHistory] = useState();
  const today = new Date();
  const todayText =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    getMaskHistory(todayText).then((res) => {
      if (res.statusCode) {
        setMaskHistory(res.data);
      } else {
        console.log(res.statusCode);
      }
    });
  }, []);

  console.log(maskHistory);

  return (
    <div>
      <ReactWeeklyDayPicker
        dayCount={7}
        startDay={new Date().setDate(today.getDate() - 6)}
      />
    </div>
  );
}

export default WeekRecord;
