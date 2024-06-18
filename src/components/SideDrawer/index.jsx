import React from "react";
import "./SideDrawer.css";

const SideDrawer = ({
  show,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  console.log("filter", filters);
  return (
    <div className={`side-drawer ${show ? "open" : ""}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Filters</h2>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
      {Object.keys(filters).map((key) => (
        <div key={key} className="filter-group">
          <label>{key}</label>
          <input
            type="text"
            value={filters[key]}
            onChange={(e) => onFilterChange(key, e.target.value)}
            placeholder={`Enter ${key}`}
          />
        </div>
      ))}
      <button className="clear-btn" onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default SideDrawer;
