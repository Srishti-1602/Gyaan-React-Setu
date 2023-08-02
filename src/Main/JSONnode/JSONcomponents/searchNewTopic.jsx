import React, { useState } from "react";
import { Button } from "react-bootstrap";
const { v4: uuidv4 } = require('uuid');

const SearchInput = ({ nodeKey, value, mydata, setData }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const uuid = uuidv4().replace(/-/g, ''); // Remove dashes from the UUID

  const handleButtonClick = () => {
    const updateNestedData = (data, key, value) => {
      // Base case: If the current data is not an object, return the current data as is
      if (typeof data !== "object" || data === null) {
        return data;
      }
  
      // Recursively update nested data
      const updatedData = Array.isArray(data) ? [...data] : { ...data };
      for (let prop in updatedData) {
        if (prop === key) {
          updatedData[prop] = value;
          break; // Stop updating subnodes once the key is found and updated
        } else {
          updatedData[prop] = updateNestedData(updatedData[prop], key, value);
        }
      }
  
      return updatedData;
    };
  
    // Update the mydata object with the inputted value under the nodeKey using recursion
    const updatedData = updateNestedData(mydata, nodeKey, inputValue);
  
    // Update the state to re-render the component with the updated data
    setData(updatedData);
  };
  
  
  

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={{
          border: "none",
          borderBottom: "1px solid #ccc",
          background: "transparent",
          padding: "5px 10px",
          color: "white",
          minWidth: "100px", // Optional: Set a minimum width to avoid shrinking too much
        }}
      />
      <Button onClick={() => handleButtonClick()}>{value}</Button>
    </span>
  );
};

export default SearchInput;
