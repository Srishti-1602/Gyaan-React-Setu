import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import './main.css';
import Navbar from '../Nav/Nav.jsx';
import JsonNode from './JSONnode/JsonNode';
import Search  from './Search/Search';
// import ArrowIcon from '../Images/9040034_box_arrow_up_right_icon.png';
import RemixIcon from '../Images/icons8-code-fork-30 (1).png';

const data = {
  id: 1,
  name: 'John Doe',
  paragraphs: 'dsadas',
  age: 30,
  hobbies: {paragraphs:['dsadas'], basketball: 'football', music: 'movies'},
  address: {
    street: {paragraphs: ['afasfsa', 'IMAGE_URL: https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg', 'dsafafa'], '123 Main St': 'Apt 1',},
    city: 'Anytown',
    state: 'CA',
    url: ['https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL'],
    paragraphs: ['afasfsa', 'dsafafa', 'IMAGE_URL: https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg', "new element", 'dasfsafsa', 'ds', 'dsafsa', 'fsafsa'],
  },
};

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
        <div>
        <button type='button' className='remix' id='remix-prompt'>
        <a href=" "> <img src={RemixIcon} alt="My Icon" className='remixic'/></a>
        <a href=" "> <img src={RemixIcon} alt="My Icon" className='remixic'/></a>
        </button>
      </div>
        <div id='Summary-Preview'></div>
        <div id="tree-view">
          <JsonNode data={jsonData} setData={handleSetData} />
        </div>
      </div>
    </div>
  );
}
