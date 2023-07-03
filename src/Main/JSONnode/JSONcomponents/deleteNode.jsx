import React from "react";

const DeleteNodeButton = ({ data, nodeKey, setData }) => {
    const handleDeleteNode = (nodeKey) => {
        const newData = deleteNode(data, nodeKey);
        if (typeof setData === "function") {
          setData(newData);
        }
      };
      
      const deleteNode = (node, nodeKey) => {
        if (typeof node !== "object" || node === null) {
          return node;
        }
      
        const newNode = Array.isArray(node) ? [...node] : { ...node };
      
        if (newNode.hasOwnProperty(nodeKey)) {
          delete newNode[nodeKey];
          return newNode;
        }
      
        for (let k in newNode) {
          newNode[k] = deleteNode(newNode[k], nodeKey);
          if (newNode[k] === null) {
            delete newNode[k];
          }
        }
      
        return newNode;
    };
    
    return (
        <i
            className="fa fa-trash"
            style={{ cursor: "pointer", color: "white", fontSize: "16px" }}
            onClick={() => handleDeleteNode(nodeKey)}
        ></i>
    );
}

export default DeleteNodeButton;