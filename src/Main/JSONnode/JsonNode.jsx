import React, { useState, useEffect } from 'react';
import PopoverButton from './AddNode';
import Paragraph from './JSONcomponents/paragraphRender';
import URL from './JSONcomponents/urlRender';
import { KeyNode } from './JSONcomponents/keyNode';
import DeleteNodeButton from './JSONcomponents/keyNodeUtils/deleteNode';

function JsonNode({ data, setData }) {
    const [expanded, setExpanded] = useState([]);

    const handleNodeClick = (key) => {
        if (expanded.includes(key)) {
        setExpanded(expanded.filter((k) => k !== key));
        } else {
        setExpanded([...expanded, key]);
        }
    };    
    

    const renderNode = (key, value) => {
        const isExpanded = expanded.includes(key);

        if (typeof value === "object" && value !== null) {
            const isParagraph = key === "paragraphs";
            const isUrl = key === "url";
            
            if (isParagraph) {
                return <Paragraph value={value} />;
            } else if (isUrl) {
                return <URL value={value} />;
            } else {
                return (
                    <li key={key}>
                        <KeyNode nodeKey={key} isExpanded={isExpanded} handleClick={handleNodeClick} />
                        <PopoverButton nodeKey={key} />
                        {" "}
                        <DeleteNodeButton data={data} nodeKey={key} setData={setData} />
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
                    <KeyNode nodeKey={key} isExpanded={isExpanded} handleClick={handleNodeClick} />
                    <PopoverButton nodeKey={key} />
                    {" "}
                    <DeleteNodeButton data={data} nodeKey={key} setData={setData} />
                    <br />
                    <span
                        style={{
                        display: isExpanded ? "inline-block" : "none",
                        color: "white",
                        fontSize: "16px",
                        marginLeft: "1em",
                        }}
                    >
                        {value}
                    </span>
                </li>
            );
        }
    }

    return <ul style={{ listStyleType: "none", paddingLeft: 0}}>{Object.entries(data).map(([key, value]) => renderNode(key, value))}</ul>;
}

export default JsonNode;