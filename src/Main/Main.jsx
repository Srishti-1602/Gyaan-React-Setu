import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import './main.css';
import Navbar from '../Nav/Nav.jsx';
import JsonNode from './JSONnode/JsonNode';

const data = {
  id: 1,
  name: 'John Doe',
  paragraphs: 'dsadas',
  age: 30,
  hobbies: {paragraphs:['dsadas'], basketball: 'football', music: 'movies'},
  address: {
    street: {paragraphs: ['afasfsa', 'dsafafa'], '123 Main St': 'Apt 1',},
    city: 'Anytown',
    state: 'CA',
    url: ['https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL'],
    paragraphs: ['afasfsa', 'dsafafa'],
  },
};

export default function Main() {
  const [jsonData, setJsonData] = useState(data);

  const handleSetData = (newData) => {
    setJsonData(newData);
  };

  return (
    <div>
      <Navbar />
      <div className='your-topics'>
        <form id='search-form'>
          <input
            type='search'
            className='searchbar'
            placeholder=' Your Topics...'
            name='search'
            id='search-input'
          />
        </form>
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
