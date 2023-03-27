/* import React, { useState } from 'react';

function JsonNode({ data }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderChildNodes = () => {
    if (Array.isArray(data)) {
      return data.map((child) => (
        <li key={child.id}>
          <JsonNode data={child} />
        </li>
      ));
    } else if (typeof data === 'object') {
      return Object.keys(data).map((key) => (
        <li key={key}>
          <strong>{key}: </strong>
          <JsonNode data={data[key]} />
        </li>
      ));
    } else {
      return data.toString();
    }
  };

  return (
    <>
      <button onClick={toggleExpanded}>
        {expanded ? 'v' : '>'}
      </button>
      {expanded && (
        <ul>
          {renderChildNodes()}
        </ul>
      )}
    </>
  );
}

export default JsonNode; */


import React, { useState } from 'react';

function JsonNode({ data, parentId, id }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const hasChildNodes = () => {
    if (Array.isArray(data)) {
      return data.length > 0;
    } else if (typeof data === 'object') {
      return Object.keys(data).length > 0;
    } else {
      return false;
    }
  };

  const renderChildNodes = () => {
    if (Array.isArray(data)) {
      return data.map((child, index) => (
        <li key={index}>
          <JsonNode data={child} parentId={id} id={`${id}-${index}`} />
        </li>
      ));
    } else if (typeof data === 'object') {
      return Object.keys(data).map((key) => (
        <li key={key}>
          <JsonNode data={data[key]} parentId={id} id={`${id}-${key}`} />
        </li>
      ));
    } else {
      return data.toString();
    }
  };

  const isExpanded = parentId && expanded;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {hasChildNodes() && (
          <button onClick={toggleExpanded}>
            {isExpanded ? 'v' : '>'}
          </button>
        )}
        {typeof data !== 'object' && <span>{data.toString()}</span>}
        {typeof data === 'object' && <strong>{'{ }'}</strong>}
      </div>
      {isExpanded && (
        <ul>
          {renderChildNodes()}
        </ul>
      )}
    </>
  );
}

export default JsonNode;
