import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import App from "./App";

moment.locale("ro");

ReactDOM.render(<App />, document.getElementById("es-pe-root"));
