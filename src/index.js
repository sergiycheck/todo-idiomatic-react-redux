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
//https://egghead.io/lessons/javascript-redux-navigating-with-react-router-link

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

reportWebVitals();
