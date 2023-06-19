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
  
  
  const [isEditable, setIsEditable] = useState(false);

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  const [editedKey, setEditedKey] = useState("");

  const handleEdit = (key) => {
    // Retrieve the original key value and set it as the editedKey
    const originalKeyValue = // Get the original key value based on the key
    setEditedKey(originalKeyValue);
    // Toggle the isEditable state to true
    setIsEditable(true);
  };

  const handleSave = (key) => {
    // Perform any validation or checks on the editedKey if needed
    // Update the key value with the editedKey in your data structure

    // Save the updated data or perform any necessary operations

    // Toggle the isEditable state to false
    setIsEditable(false);
  };

  

  const renderNode = (key, value) => {
    const handleAddNode = () => {
      // Update the data structure with the new node
      const newData = { ...data };
      newData[key].push(""); // Or set an initial value for the new node
      setData(newData);
    };
    if (typeof value === "object" && value !== null) {
      const isParagraph = key === "paragraphs";
      const isUrl = key === "url";
      const isExpanded = expanded.includes(key);
  
      if (isParagraph) {
        const paragraphs = Array.isArray(value)
          ? value.map((paragraph) => {
            if (paragraph.startsWith("IMAGE_URL: ")) {
              const imageUrl = paragraph.substring("IMAGE_URL: ".length);
              return <img src={imageUrl} alt="embedded" style={{backgroundColor: "white"}} />;
            } else if(paragraph.startsWith("LIST_TEXT: ")){
              const listText = paragraph.substring("LIST_TEXT: ".length);
              return <li style={{ color: "white" , fontSize: "16px" }}>{listText}</li>;
            } else {
              return <MathJax>{ paragraph}</MathJax>;
            }
            })
          : value;
  
        return <span style={{ color: "white" , fontSize: "16px", paddingLef: "1em" }}>
        {paragraphs.map((paragraph) => (
          <>{paragraph}          <br />
          </>
          
        ))}
          <button onClick={handleAddNode}>Add Node</button>
        </span>
          ;
      } else if (isUrl) {
        return (
          <span style={{ color: "white", fontSize: "16px"}}>
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
              {key}{" "}
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
                  fontSize: "16px"
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
            onClick={() => {
              if (!isEditable) {
                handleNodeClick(key);
              }
            }}
            style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            contentEditable={isEditable}
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
            {key}:{" "}
            <i
              className="fa fa-trash"
              style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
              onClick={() => handleDeleteNode(key)}
            ></i>
          </span>
          <br />
          <span
            style={{
              display: expanded.includes(key) ? "inline-block" : "none",
              color: "white",
              fontSize: "16px",
              marginLeft: "1em",
            }}
            onClick={() => handleDoubleClick()}
            //onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
            contentEditable={isEditable}
          >
            {value}
          </span>
        </li>
      );
    }
  };
  
  
  return <ul style={{ listStyleType: "none", paddingLeft: 0}}>{Object.entries(data).map(([key, value]) => renderNode(key, value))}</ul>;

}

export default JsonNode;