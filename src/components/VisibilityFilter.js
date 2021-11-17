import React from "react";
import { connect } from "react-redux";
import { todoActionTypes, filterTypes } from "../redux/actionTypes";
import PropTypes from "prop-types";
import cx from "classnames";

const VisibilityFilter = ({ activeFilter, onFilterClick }) => {
  const renderedFilters = Object.values(filterTypes).map((filterVal, i) => {
    return (
      <span
        key={`${i}-${filterVal}`}
        onClick={() => {
          onFilterClick(filterVal);
        }}
        className={cx("filter", activeFilter === filterVal && "filter-active")}
      >
        {filterVal}
      </span>
    );
  });
  return <div className="visibility-filters">{renderedFilters}</div>;
};

VisibilityFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeFilter: state.filters.filterType,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(filterType) {
    dispatch({ type: todoActionTypes.SET_FILTER, payload: filterType });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityFilter);
