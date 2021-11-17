import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import App from "./app/App";

const Root = ({ store }) => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
