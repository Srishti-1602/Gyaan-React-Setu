import React, { useEffect, useState } from "react";

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
  
const Paragraph = ({ nodeKey, value, mydata, setData }) => {
  const initialEditableValue = Array.isArray(value) ? value : [value];
  const [editableValue, setEditableValue] = useState(initialEditableValue);
  const [temporaryValues, setTemporaryValues] = useState({});
  
  useEffect(() => {
    setEditableValue(initialEditableValue);
    setTemporaryValues({});
  }, [initialEditableValue]);

  const handleContentChange = (index, event) => {
    const updatedValue = event.target.innerText;
    setTemporaryValues((prevValues) => ({
      ...prevValues,
      [index]: updatedValue,
    }));
  };

  const handleBlur = (index) => {
    // Create a new array with the updated content for the specific paragraph index
    const updatedValue = editableValue.map((paragraph, i) => (i === index ? temporaryValues[index] || paragraph : paragraph));
  
    // Update the value in the nested data using setData
    const newData = { ...mydata };
    const updateNestedValue = (data, key, updatedValue) => {
      if (data[key]) {
        data[key] = updatedValue;
      }
      Object.keys(data).forEach((k) => {
        if (typeof data[k] === "object") {
          updateNestedValue(data[k], key, updatedValue);
        }
      });
    };
  
    updateNestedValue(newData, nodeKey, updatedValue);
  
    // Set the updated nested dictionary using setData
    setData(newData);
  };
  

  const paragraphs = Array.isArray(editableValue)
    ? editableValue.map((paragraph, index) => {
        if (paragraph.startsWith("IMAGE_URL: ")) {
          const imageUrl = paragraph.substring("IMAGE_URL: ".length);
          return <img key={index} src={imageUrl} alt="embedded" style={{ backgroundColor: "white" }} />;
        } else if (paragraph.startsWith("LIST_TEXT: ")) {
          const listText = paragraph.substring("LIST_TEXT: ".length);
          return <li key={index} style={{ color: "white", fontSize: "16px" }}>{listText}</li>;
        } else {
          return (
            <MathJax key={index}>
              {paragraph}
            </MathJax>
          );
        }
      })
    : editableValue;

  return (
    <span style={{
      color: "white", fontSize: "16px", paddingLeft: "0em"
    }}
    >
      {paragraphs.map((paragraph, index) => (
        <React.Fragment key={index}>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={() => handleBlur(index)}
            onInput={(event) => handleContentChange(index, event)}
          >
            {paragraph}
          </div>
        </React.Fragment>
      ))}
    </span>
  );
};

export default Paragraph;




