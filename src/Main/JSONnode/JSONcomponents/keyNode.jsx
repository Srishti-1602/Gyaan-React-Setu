import React, { useState } from "react";

export const KeyNode = ({ nodeKey, isExpanded, handleClick, setData, data }) => {
  const isExp = isExpanded;

  const handleNodeClick = (nodeKey) => {
    return handleClick(nodeKey);
  };


  const handleKeyChange = (event) => {
    nodeKey = event.target.textContent; // Update the node key value
  };

  const isUnderlined = nodeKey === "newSubtitle"; // Check if editableKey is equal to "newSubtitle"

  return (
    <span>
      <span
        onClick={() => handleNodeClick(nodeKey)}
        style={{ cursor: "pointer", color: "aliceblue", fontSize: "16px" }}
      >
        {isExp ? (
          <i
            className="fa fa-caret-down"
            style={{ marginRight: "10px", color: "aliceblue", fontSize: "16px" }}
          ></i>
        ) : (
          <i
            className="fa fa-caret-right"
            style={{ marginRight: "10px", color: "aliceblue", fontSize: "16px" }}
          ></i>
        )}
      </span>
      <span
        style={{
          cursor: "pointer",
          color: isUnderlined? "#DCDCDC" : "aliceblue",
          fontSize: "16px",
          textDecoration: isUnderlined ? "underline" : "none",
        }}
        contentEditable
        onBlur={(event) => handleKeyChange(event, nodeKey)}// Handle onBlur event to save the updated key value
        suppressContentEditableWarning={true} // Suppress the contentEditable warning
      >
        {isUnderlined ? "Add Your Topic Title Here" : nodeKey.slice(33)}
      </span>{" "}
    </span>
  );
};
