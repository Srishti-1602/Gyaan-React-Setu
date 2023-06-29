import React, { useState } from "react";

const ExpandableData = ({ data, onUpdateData }) => {
  const [expandedNodes, setExpandedNodes] = useState({});

  const handleExpand = (key) => {
    setExpandedNodes((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSearch = (parentKey) => {
    const inputValue = prompt("Enter search value:");
    if (inputValue) {
      const newKey = "SEARCH";
      const newValue = inputValue;
      const updatedData = {
        ...data,
        [parentKey]: {
          ...data[parentKey],
          [newKey]: newValue,
        },
      };
      setExpandedNodes((prevState) => ({
        ...prevState,
        [parentKey]: true,
      }));
      onUpdateData(updatedData);
    }
  };

  const renderData = (obj, parentKey = "") => {
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      const isNestedObject = typeof value === "object" && !Array.isArray(value);
      const nestedKey = parentKey ? `${parentKey}.${key}` : key;
      const isExpanded = expandedNodes[nestedKey];

      return (
        <div key={nestedKey} style={{ color: "white" }}>
          <span>{nestedKey}</span>
          <span onClick={() => handleExpand(nestedKey)}>+</span>
          {isExpanded && (
            <div>
              <input type="text" placeholder="Search..." />
              <button onClick={() => handleSearch(nestedKey)}>Search</button>
            </div>
          )}
          {isNestedObject && renderData(value, nestedKey)}
        </div>
      );
    });
  };

  return <div>{renderData(data)}</div>;
};

export default ExpandableData;
