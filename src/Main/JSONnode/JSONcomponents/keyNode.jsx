import React, { useState } from "react";


export const KeyNode = ({ nodeKey, isExpanded, handleClick }) => {
    
    const isExp = isExpanded;

    const handleNodeClick = (nodeKey) => {
        return handleClick(nodeKey);
    }


    return (
        <span
            onClick={() => handleNodeClick(nodeKey)}
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
            {nodeKey}{" "}
        </span>
    );
}
