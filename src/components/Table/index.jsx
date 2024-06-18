import React, { useState, useEffect } from "react";
import "./Table.css";
import { exportToCSV } from "../../utils";
import SideDrawer from "../SideDrawer";
import FilterIcon from "../../assets/filter_icon.svg";
import ColumnIcon from "../../assets/column_filter.svg";
import ExportIcon from "../../assets/export_icon.svg";
import Popover from "../Popover";

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    email: "",
    salary: "",
  });

  const [showDrawer, setShowDrawer] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedVisibility = localStorage.getItem("visibleColumns");
    return savedVisibility ? JSON.parse(savedVisibility) : Object.keys(data[0]);
  });

  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const exportData = () => {
    exportToCSV(filteredData, "table_data");
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setTableData(sortedData);
  };

  const filteredData = tableData.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return item[key]
        .toString()
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      age: "",
      email: "",
      salary: "",
    });
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div>
      <h2>Enhanced Table</h2>
      <div className="filter-container">
        {/* <button onClick={() => setVisibleColumns([])}>Hide All Columns</button>
        <button onClick={() => setVisibleColumns(Object.keys(data[0]))}>
          Show All Columns
        </button> */}
        <button
          onClick={() => setShowDrawer(true)}
          height={20}
          className="filter-button"
        >
          <img height={20} src={FilterIcon} alt="icon" />
          Filters
        </button>
        <button onClick={() => setShowPopover(true)} className="filter-button">
          <img height={20} src={ColumnIcon} alt="icon" />
          Columns
        </button>
        <button onClick={exportData} className="filter-button">
          <img height={20} src={ExportIcon} alt="icon" />
          Export to CSV
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) =>
              visibleColumns.includes(key) ? (
                <th key={key} onClick={() => handleSort(key)}>
                  {key}
                  {sortConfig.key === key ? (
                    sortConfig.direction === "ascending" ? (
                      " ↑"
                    ) : (
                      " ↓"
                    )
                  ) : (
                    <span style={{ color: "#888" }}>{" ⇅"}</span>
                  )}
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) =>
                visibleColumns.includes(key) ? (
                  <td key={key} data-label={key}>
                    {row[key]}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <SideDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <Popover
        show={showPopover}
        columns={Object.keys(data[0])}
        visibleColumns={visibleColumns}
        onToggleColumn={toggleColumnVisibility}
        onClose={() => setShowPopover(false)}
      />
    </div>
  );
};

export default Table;
