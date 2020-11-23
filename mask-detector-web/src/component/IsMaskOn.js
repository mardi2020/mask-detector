import React, { useState, useEffect } from "react";
import "../styles/IsMaskOn.css";

function IsMaskOn() {
  const [onOff, setOnOff] = useState(false);
  const conn = new WebSocket(
    "wss://a80a3x9fs2.execute-api.us-east-1.amazonaws.com/production"
  );

  useEffect(() => {
    //socket 통신 연결
    conn.onopen = () => {
      console.log("connected");
    };
    // listen to onmessage event
    conn.onmessage = (evt) => {
      // 메시지 왔을 때 할일 (evt에 저장)
      const message = JSON.parse(evt.data);
      console.log(message);
      setOnOff(false);
    };

    conn.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  return (
    <div className="IsMaskOn__Wrapper">
      {/* <div className="IsMaskOn-result">IsMaskOn Text</div> */}
      {onOff === true ? (
        <h1>
          <span>V</span>
          <span>e</span>
          <span>r</span>
          <span>y</span>
          <span>&nbsp;</span>
          <span>G</span>
          <span>o</span>
          <span>o</span>
          <span>d</span>
        </h1>
      ) : (
        <h1>
          <span>마</span>
          <span>스</span>
          <span>크</span>
          <span>착</span>
          <span>용</span>
          <span>해</span>
        </h1>
      )}
    </div>
  );
}

export default IsMaskOn;
