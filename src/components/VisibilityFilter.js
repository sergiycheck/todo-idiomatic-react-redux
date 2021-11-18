import React from "react";
import { filterTypes } from "../redux/actionTypes";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import cx from "classnames";

const VisibilityFilter = () => {
  return (
    <div className="visibility-filters">
      <FilterLink filter={filterTypes.All}>
        {filterTypes.All}
        {", "}
      </FilterLink>

      <FilterLink filter={filterTypes.Active}>
        {filterTypes.Active}
        {", "}
      </FilterLink>

      <FilterLink filter={filterTypes.Completed}>{filterTypes.Completed}</FilterLink>
    </div>
  );
};

export const FilterLink = ({ filter, children }) => {
  const toRes = filter === filterTypes.All ? "/" : filter;
  const params = useParams();
  return (
    <Link
      to={toRes}
      className={cx(
        "filter",
        ((!params.filter && filter === filterTypes.All) || params.filter === filter) && "filter-active"
      )}
    >
      {children}
    </Link>
  );
};

FilterLink.propTypes = {
  filter: PropTypes.oneOf([...Object.values(filterTypes)]).isRequired,
  children: PropTypes.node.isRequired,
};

export default VisibilityFilter;
