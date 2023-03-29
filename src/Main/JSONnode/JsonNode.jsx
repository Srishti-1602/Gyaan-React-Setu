
//WITHOUT DELETE BUTTON

import React, { useState } from 'react';

function JsonNode({ data, setData }) {
  const [expanded, setExpanded] = useState([]);

  const handleNodeClick = (key) => {
    if (expanded.includes(key)) {
      setExpanded(expanded.filter((k) => k !== key));
    } else {
      setExpanded([...expanded, key]);
    }
  };

  const handleDeleteNode = (key) => {
    const newData = deleteNode(data, key);
    if (typeof setData === "function") {
      setData(newData);
    }
  };
  
  const deleteNode = (node, key) => {
    if (typeof node !== "object" || node === null) {
      return node;
    }
  
    const newNode = Array.isArray(node) ? [...node] : { ...node };
  
    if (newNode.hasOwnProperty(key)) {
      delete newNode[key];
      return newNode;
    }
  
    for (let k in newNode) {
      newNode[k] = deleteNode(newNode[k], key);
      if (newNode[k] === null) {
        delete newNode[k];
      }
    }
  
    return newNode;
  };
  
  

  const renderNode = (key, value) => {
    if (typeof value === "object" && value !== null) {
      const isParagraph = key === "paragraphs" || key === "url";
      const isExpanded = expanded.includes(key);
  
      return (
        <li key={key}>
          {isParagraph ? (
            <span style={{ color: "white" }}>
              {Array.isArray(value) ? value.join(" ") : value}
            </span>
          ) : (
            <span onClick={() => handleNodeClick(key)} style={{ color: 'white' }}>
              {isExpanded ? (
                <i className="fa fa-caret-down" style={{ marginRight: "10px", color: 'white' }}></i>
              ) : (
                <i className="fa fa-caret-right" style={{ marginRight: "10px", color: 'white' }}></i>
              )}
              {key}{' '}
              <i className="fa fa-trash" style={{ cursor: "pointer", color: 'white' }} onClick={() => handleDeleteNode(key)}></i>
            </span>
          )}
          {isParagraph ? null : (
            <ul style={{ display: isExpanded ? "block" : "none", paddingLeft: "1em", listStyleType: "none" }}>
              {Object.entries(value).map(([k, v]) => renderNode(k, v))}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li key={key}>
          <span onClick={() => handleNodeClick(key)} style={{ cursor: "pointer", color: 'white' }}>
            {expanded.includes(key) ? (
              <i className="fa fa-caret-down" style={{ marginRight: "10px", color: 'white' }}></i>
            ) : (
              <i className="fa fa-caret-right" style={{ marginRight: "10px", color: 'white' }}></i>
            )}
            {key}:{' '}
            <i className="fa fa-trash" style={{ cursor: "pointer", color: 'white' }} onClick={() => handleDeleteNode(key)}></i>
          </span>
          <br />
          <span style={{ paddingLeft: "3em", display: expanded.includes(key) ? "inline" : "none", color: 'white' }}>
            {value}
          </span>
        </li>
      );
    }
  };
  
  
  return <ul style={{ listStyleType: "none", paddingLeft: 0}}>{Object.entries(data).map(([key, value]) => renderNode(key, value))}</ul>;

}

export default JsonNode;
