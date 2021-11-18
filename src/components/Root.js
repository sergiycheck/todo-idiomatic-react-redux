import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./app/App";

const Root = ({ store }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={App}></Route>
          </Switch>
        </Router>
      </Provider>
    </React.StrictMode>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
