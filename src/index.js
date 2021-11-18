import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./redux/store";
import Root from "./components/Root";

//tutorial repo
//https://github.com/gaearon/todos/tree/27-updating-data-on-the-server

//tutorial videos explanations
//https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions

//continue
//https://github.com/gaearon/todos/compare/12-wrapping-dispatch-to-log-actions...13-adding-a-fake-backend
//https://egghead.io/lessons/javascript-redux-adding-a-fake-backend-to-the-project

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

reportWebVitals();
