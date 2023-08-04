import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import apiComm from "../../Search/backendIntegration"
const { v4: uuidv4 } = require('uuid');

const SearchInput = ({ nodeKey, value, mydata, setData }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const uuid = uuidv4().replace(/-/g, ''); // Remove dashes from the UUID

  let nestedData = {
    [uuid + '_' + 'Subtitle']: ['Add Your Topic Content Here'],
    ['Subtitle2']: ['Add Your Topic Content Here'],
  };

  const handleSubtopicSearch = async () => {
    setLoading(true);
    // Call the API with the inputValue as the query
    try {
      const apiResponse = await apiComm(inputValue);
      const apiData = JSON.parse(apiResponse.data);

      // Merge the inputValue with the first 32 characters of the nodeKey
      const updatedNodeKey = nodeKey.slice(0, 32) + '_' + inputValue;

      // Create a copy of mydata to avoid directly mutating the state
      const newData = { ...mydata };

      // Update the nested dictionary with the new nodeKey and API data
      const updateNestedDict = (data, key, newKey, apiData) => {
        if (data[key]) {
          data[newKey] = apiData;
          delete data[key];
        }
        Object.keys(data).forEach((k) => {
          if (typeof data[k] === 'object') {
            updateNestedDict(data[k], key, newKey, apiData);
          }
        });
      };

      updateNestedDict(newData, nodeKey, updatedNodeKey, apiData);

      // Set the updated nested dictionary using setData
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setLoading(false);
    }
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
      <Button onClick={() => handleSubtopicSearch()}>{value}  </Button>

      {loading ? <Spinner animation="border" size="sm" /> : null}
    </span>
  );
};

export default SearchInput;
