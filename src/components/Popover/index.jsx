import React, { useEffect, useRef } from "react";
import "./Popover.css";

const Popover = ({
  show,
  columns,
  visibleColumns,
  onToggleColumn,
  onClose,
  position,
}) => {
  const popoverRef = useRef();
  const handleClickOutside = (event) => {
    console.log("called function handle");
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      console.log("closed called");
      onClose();
    }
  };

  const popoverStyle = {
    position: "absolute",
    top: position.top,
    left: position.left,
    transform: "translateX(-50%)",
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div ref={popoverRef} className="popover" style={popoverStyle}>
      <h3>Select Columns</h3>
      {columns.map((column) => (
        <div key={column}>
          <input
            type="checkbox"
            id={column}
            checked={visibleColumns.includes(column)}
            onChange={() => onToggleColumn(column)}
          />
          <label htmlFor={column}>{column}</label>
        </div>
      ))}
    </div>
  );
};

export default Popover;
