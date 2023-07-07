import React, { useState, useRef, useEffect } from "react";

export const KeyNode = ({ nodeKey, keyContent, isExpanded, handleClick, setData, data }) => {
  const isExp = isExpanded;

  const handleNodeClick = (nodeKey) => {
    return handleClick(nodeKey);
  };

  const isUnderlined = keyContent === "Add Your Topic Title Here"; // Check if editableKey is equal to "newSubtitle"


  /* Edit Node Key Functionality */

  const [editableKey, setEditableKey] = useState(keyContent);
  const uniqueId = nodeKey;

  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      spanRef.current.textContent = editableKey;
    }
  }, [editableKey]);

  const handleKeyChange = () => {
    const newKeyContent = spanRef.current.textContent.trim();
  
    const updateKeysRecursive = (obj) => {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
  
      if (Array.isArray(obj)) {
        return obj.map((item) => updateKeysRecursive(item));
      }
  
      const updatedObj = {};
      for (let key in obj) {
        if (key.substring(0, 32) === uniqueId) {
          const updatedKey = uniqueId + '_' + newKeyContent;
          updatedObj[updatedKey] = updateKeysRecursive(obj[key]);
        } else {
          updatedObj[key] = updateKeysRecursive(obj[key]);
        }
      }
  
      return updatedObj;
    };
  
    const updatedData = updateKeysRecursive(data);
    setData(updatedData);
    setEditableKey(newKeyContent);
  };
  
  /* End Edit Node Key Functionality */
  
  

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
        ref={spanRef}
        style={{
          cursor: "pointer",
          color: isUnderlined ? "#DCDCDC" : "aliceblue",
          fontSize: "16px",
          textDecoration: isUnderlined ? "underline" : "none",
        }}
        contentEditable={true}
        onBlur={handleKeyChange}
        dangerouslySetInnerHTML={{ __html: keyContent }}
      ></span>
      {" "}
    </span>
  );
};
