import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import socketio from "socket.io-client";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
//socket 통신 연결
const socket = socketio.connect(
  "wss://a80a3x9fs2.execute-api.us-east-1.amazonaws.com/production"
);

(() => {
  socket.on("welcome", (msg) => {
    console.log(msg);
  });
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
