import React, { useState } from 'react';

const AddNewSubtopic = ({ nodeKey, isExpanded, handleClick }) => {
    const isExp = isExpanded;

    const handleNodeClick = (nodeKey) => {
        return handleClick(nodeKey);
    }

    const [editableKey, setEditableKey] = useState(nodeKey); // Add state to store the editable key value

    const handleKeyChange = (event) => {
        setEditableKey(event.target.textContent); // Update the editable key value
    }


    return (
        <span>
            <span
                onClick={() => handleNodeClick(editableKey)}
                style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
            >
                {isExp ? (
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
            </span>
            <span
                style={{ cursor: "pointer", color: "white", fontSize: "16px", textDecoration: "underline" }}
                contentEditable
                onBlur={handleKeyChange} // Handle onBlur event to save the updated key value
                suppressContentEditableWarning={true} // Suppress the contentEditable warning
            >
                {editableKey}
            </span>
            {" "}
        </span>
        
    );
}

export default AddNewSubtopic;