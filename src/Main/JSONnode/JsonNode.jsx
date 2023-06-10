import React, { useState } from 'react';
import { useEffect } from "react";

function MathJax(props) {
  useEffect(() => {
    // Load MathJax script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      window.MathJax.Hub.Config({
        extensions: ["tex2jax.js", "autoMath2.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
          inlineMath: [["$", "$"],
						['\\(\\', '\\)\\'],
						["\\[", "\\]"],
					],
          displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        },
        TeX: {
          extensions: ["AMSmath.js", "AMSsymbols.js"],
        },
      });
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    };
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML";
    document.head.appendChild(script);

    return () => {
      // Unload MathJax script
      document.head.removeChild(script);
    };
  }, []);

  return <span dangerouslySetInnerHTML={{ __html: props.children }} />;
}

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

  // Event handler for paragraph content change
const handleParagraphChange = (key, newValue) => {
  // Assuming `data` is the state variable representing your data object
  const updatedData = { ...data };

  // Update the paragraph value
  updatedData[key] = newValue;

  // Update the state with the modified data
  setData(updatedData);
};

// Event handler for URL change
const handleUrlChange = (key, newValue) => {
  // Assuming `data` is the state variable representing your data object
  const updatedData = { ...data };

  // Update the URL value
  updatedData[key] = newValue;

  // Update the state with the modified data
  setData(updatedData);
};

// Event handler for key change
const handleKeyChange = (oldKey, newKey) => {
  // Assuming `data` is the state variable representing your data object
  const updatedData = { ...data };

  // Check if the new key already exists
  if (newKey !== oldKey && updatedData.hasOwnProperty(newKey)) {
    // Handle the case where the new key already exists (e.g., show an error message)
    console.error('Key already exists!');
    return;
  }

  // Rename the key
  updatedData[newKey] = updatedData[oldKey];
  delete updatedData[oldKey];

  // Update the state with the modified data
  setData(updatedData);
};

// Event handler for value change
const handleValueChange = (key, newValue) => {
  // Assuming `data` is the state variable representing your data object
  const updatedData = { ...data };

  // Update the value
  updatedData[key] = newValue;

  // Update the state with the modified data
  setData(updatedData);
  };
  
  // Function to calculate the width of the text
  const calculateInputWidth = (text) => {
    const dummyInput = document.createElement('span');
    dummyInput.style.visibility = 'hidden';
    dummyInput.style.whiteSpace = 'pre';
    dummyInput.innerText = text;

    document.body.appendChild(dummyInput);
    const width = dummyInput.getBoundingClientRect().width;
    document.body.removeChild(dummyInput);

    return width;
  };
  
  

  const renderNode = (key, value) => {
    if (typeof value === "object" && value !== null) {
      const isParagraph = key === "paragraphs";
      const isUrl = key === "url";
      const isExpanded = expanded.includes(key);
  
      if (isParagraph) {
        const paragraphs = Array.isArray(value)
          ? value.map((paragraph) => {
              if (paragraph.startsWith("IMAGE_URL: ")) {
                const imageUrl = paragraph.substring("IMAGE_URL: ".length);
                return <img src={imageUrl} alt="embedded" style={{ backgroundColor: "white" }} />;
              } else if (paragraph.startsWith("LIST_TEXT: ")) {
                const listText = paragraph.substring("LIST_TEXT: ".length);
                return <li style={{ color: "white", fontSize: "16px" }}>{listText}</li>;
              } else {
                return (
                  <input
                    type="text"
                    value={paragraph}
                    onChange={(event) => handleParagraphChange(key, event.target.value)}
                    style={{ color: "white",
                    fontSize: "16px",
                    backgroundColor: "transparent",
                    border: "none",
                    width: "100%",
                    maxWidth: "100%",
                    resize: "none",
                    overflow: "hidden",
       }}
                  />
                );
              }
            })
          : value;
  
        return (
          <span style={{ color: "white", fontSize: "16px" }}>
            {paragraphs.map((paragraph) => (
              <>
                {paragraph} <br />
              </>
            ))}
          </span>
        );
      } else if (isUrl) {
        return (
          <span style={{ color: "white", fontSize: "16px" }}>
            <span
              style={{
                color: "gray",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => window.open(value, "_blank")}
            >
              {value}
            </span>
            <br />
          </span>
        );
      } else {
        return (
          <li key={key}>
            <span
              onClick={() => handleNodeClick(key)}
              style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
            >
              {isExpanded ? (
                <i
                  className="fa fa-caret-down"
                  style={{ marginRight: "10px", color: "white", fontSize: "16px" }}
                ></i>
              ) : (
                <i
                  className="fa fa-caret-right"
                  style={{ marginRight: "10px", color: "white", fontSize: "16px" }}
                ></i>
              )}
              {isExpanded ? (
                <input
                  type="text"
                  value={key}
                  onChange={(event) => handleKeyChange(key, event.target.value)}
                  style={{
                    color: "white",
                    fontSize: "16px",
                    backgroundColor: "transparent",
                    border: "none",
                    width: calculateInputWidth(key),
                  }}
                />
              ) : (
                <span>{key}</span>
              )}
              <i
                className="fa fa-trash"
                style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
                onClick={() => handleDeleteNode(key)}
              ></i>
            </span>
            {Object.entries(value).length > 0 && (
              <ul
                style={{
                  display: isExpanded ? "block" : "none",
                  paddingLeft: "1em",
                  listStyleType: "none",
                }}
              >
                {Object.entries(value).map(([k, v]) => renderNode(k, v))}
              </ul>
            )}
          </li>
        );
      }
    } else {
      return (
        <li key={key}>
          <span
            onClick={() => handleNodeClick(key)}
            style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
          >
            {expanded.includes(key) ? (
              <i
                className="fa fa-caret-down"
                style={{ marginRight: "10px", color: "white", fontSize: "16px" }}
              ></i>
            ) : (
              <i
                className="fa fa-caret-right"
                style={{ marginRight: "10px", color: "white", fontSize: "16px" }}
              ></i>
            )}
            <input
              type="text"
              value={key}
              onChange={(event) => handleKeyChange(key, event.target.value)}
              style={{ color: "white", fontSize: "16px", backgroundColor: "transparent", border: "none", width: calculateInputWidth(key) }}
            />
            <i
              className="fa fa-trash"
              style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
              onClick={() => handleDeleteNode(key)}
            ></i>
          </span>
          <br />
          <span
            style={{
              paddingLeft: "3em",
              display: expanded.includes(key) ? "inline" : "none",
              color: "white",
              fontSize: "16px",
            }}
          >
            <input
              type="text"
              value={value}
              onChange={(event) => handleValueChange(key, event.target.value)}
              style={{ color: "white", fontSize: "16px", backgroundColor: "transparent", border: "none", width: calculateInputWidth(value) }}
            />
          </span>
        </li>
      );
    }
  };
  
  return <ul style={{ listStyleType: "none", paddingLeft: 0 }}>{Object.entries(data).map(([key, value]) => renderNode(key, value))}</ul>;
  

}

export default JsonNode;
