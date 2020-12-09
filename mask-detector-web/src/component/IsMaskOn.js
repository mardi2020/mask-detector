import React, { useState, useEffect } from "react";
import "../styles/IsMaskOn.css";

function IsMaskOn() {
  const [onOff, setOnOff] = useState(true);
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
      console.log(message.withMask);
      setOnOff(message.withMask);
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
          <span>오</span>
          <span>늘</span>
          <span>도</span>
          <span>&nbsp;</span>
          <span>좋</span>
          <span>은</span>
          <span>하</span>
          <span>루</span>
          <span>:)</span>
        </h1>
      ) : (
        <h1>
          <span>마</span>
          <span>스</span>
          <span>크</span>
          <span>착</span>
          <span>용</span>
          <span>해</span>
          <span>주</span>
          <span>세</span>
          <span>요</span>
          <span>!</span>
        </h1>
      )}
    </div>
  );
}

export default IsMaskOn;
