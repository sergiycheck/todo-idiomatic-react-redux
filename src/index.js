import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import App from "./components/root/App";

//tutorial repo
//https://github.com/gaearon/todos/tree/27-updating-data-on-the-server

//tutorial videos explanations
//https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
