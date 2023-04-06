import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import './main.css';
import Navbar from '../Nav/Nav.jsx';
import JsonNode from './JSONnode/JsonNode';
import Search  from './Search/Search';

const data = {};

export default function Main() {
  const [jsonData, setJsonData] = useState(data);

  const handleSetData = (newData) => {
    setJsonData(newData);
  };

  const handleSearch = (searchQuery) => {
    console.log(`Search query: ${searchQuery}`);
    setJsonData(searchQuery);
  };


  return (
    <div>
      <Navbar />
      <div className='your-topics'>
      <Search onSearch={handleSearch} />
      </div>
      <div className='saveNotesDiv'>
        <button type='button' className='savebutt' id='save-prompt-button'>
          Save
        </button>
      </div>
      <div className='rectnotes'>
        <div id='Summary-Preview'></div>
        <div id="tree-view">
          <JsonNode data={jsonData} setData={handleSetData} />
        </div>
      </div>
    </div>
  );
}
