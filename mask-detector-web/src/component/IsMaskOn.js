import React, { useState, useEffect } from "react";
import "../styles/IsMaskOn.css";

function IsMaskOn() {
  const [onOff, setOnOff] = useState(false);

  useEffect(() => {}, []);

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
