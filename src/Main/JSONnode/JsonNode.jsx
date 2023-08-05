import React, { useState } from 'react';
import PopoverButton from './JSONcomponents/AddNode';
import Paragraph from './JSONcomponents/paragraphRender';
import URL from './JSONcomponents/urlRender';
import { KeyNode } from './JSONcomponents/keyNode';
import DeleteNodeButton from './JSONcomponents/deleteNode';
import SearchInput from './JSONcomponents/searchNewTopic';


function JsonNode({ data, setData }) {
    const [expanded, setExpanded] = useState([]);

    const handleNodeClick = (key) => {
        const uniqueId = key.slice(0, 32);
        if (expanded.includes(uniqueId)) {
        setExpanded(expanded.filter((k) => k !== uniqueId));
        } else {
        setExpanded([...expanded, uniqueId]);
        }
    };    
    

    const renderNode = (key, value) => {
        const uniqueId = key.slice(0, 32);
        const isExpanded = expanded.includes(uniqueId);

        if (typeof value === "object" && value !== null) {
            const isParagraph =
            key.slice(33) === "paragraphs" ||
            key.slice(33) === "searchFor" ||
            key === "newParagraph";
            const isUrl = key.slice(33) === "url" || key.slice(33) === "newSearchTopic1";
            const isNewSearchTopic = key.slice(33) === "newSearchTopic";
            
            if (isParagraph) {
                return <Paragraph nodeKey={key} value={value} mydata={data} setData={setData} />;
            } else if (isUrl) {
                return <URL value={value} />;
            } else if (isNewSearchTopic) {
                return <SearchInput nodeKey={key} value={value} mydata={data} setData={setData} />;
            } else {
                return (
                    <li key={uniqueId}>
                        <KeyNode nodeKey={uniqueId} keyContent={key.slice(33)} isExpanded={isExpanded} handleClick={handleNodeClick} setData={setData} data={data} />
                        <PopoverButton nodeKey={key} mydata={data} setData={setData} isExpanded={isExpanded} handleNodeClick={handleNodeClick} />
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
                <li key={uniqueId}>
                    <KeyNode nodeKey={uniqueId} keyContent={key.slice(33)} isExpanded={isExpanded} handleClick={handleNodeClick} setData={setData} data={data} />
                    <PopoverButton nodeKey={key} mydata={data} setData={setData} isExpanded={isExpanded} handleNodeClick={handleNodeClick} />
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