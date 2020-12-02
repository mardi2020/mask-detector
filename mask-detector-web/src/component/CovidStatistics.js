import React, { useEffect, useState } from "react";
import { getCovidNum } from "../function/CovidApi";
import Bar from "react-chartjs-2";
import moment from "moment";
import "chartjs-plugin-datalabels";

function CovidStatistics() {
  const [covidData, setCovidData] = useState({ labels: [], datasets: [] });
  const today = moment().format("YYYYMMDD");
  const today_minus7 = moment().subtract(7, "days").format("YYYYMMDD");
  const [item, setItem] = useState([]);
  let decideCnt = [];
  let labels = [];
  let dataColor = [
    "#837FFF",
    "#837FFF",
    "#837FFF",
    "#837FFF",
    "#837FFF",
    "#837FFF",
    "#FD7468",
  ];
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: "#000000",
        anchor: "end",
      },
    },
    scales: {
      xAxes: [
        {
          color: "white",
          stacked: true,
          display: true,
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  useEffect(() => {
    getCovidNum(today, today_minus7).then((datas) => {
      datas.data ? setItem(datas.data.body.items.item) : setItem();
    });
    setCovidData({
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Covid Datasets",
          data: decideCnt ? decideCnt : [34, 45, 66, 20, 32, 55, 98],
          fill: true,
          barPercentage: 0.5,
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (item.length > 8) {
      setItem(
        item.filter((it, idx) => {
          if (idx > 1) {
            return item[idx - 1].createDt !== item[idx].createDt;
          } else {
            return item;
          }
        })
      );
    }

    let tmp = 0,
      todaycnt = 0;
    decideCnt = item.map((element) => {
      todaycnt = tmp - element.decideCnt;
      tmp = element.decideCnt;
      if (todaycnt > 0) {
        return todaycnt;
      }
    });
    decideCnt.reverse();
    decideCnt.splice(7);

    //stateDt
    labels = item.map((element) => {
      return (
        element.stateDt.toString().slice(4, 6) +
        "월 " +
        element.stateDt.toString().slice(6, 8) +
        "일"
      );
    });
    labels.reverse();
    labels.splice(7);

    //data set
    setCovidData({
      labels: labels ? labels : ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Covid Datasets",
          data: decideCnt ? decideCnt : [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: dataColor,
          borderColor: dataColor,
          hoverBackgroundColor: dataColor,
          fill: true,
          barPercentage: 0.5,
        },
      ],
    });
  }, [item]);

  return (
    <div className="CovidStatistics__Wrapper">
      <div className="CovidStatistics-box">
        <Bar
          data={covidData}
          type="bar"
          options={options}
          width={400}
          height={180}
        />
      </div>
    </div>
  );
}

export default CovidStatistics;
