import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './main.css';
import Navbar from '../Nav/Nav.jsx';
import JsonNode from './JSONnode/JsonNode';

const data = {
  id: 1,
  name: 'John Doe',
  age: 30,
  hobbies: ['reading', 'coding', 'hiking'],
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
};

export default function Main() {
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
          <JsonNode data={data} />
    </div>
		</div>
</div>
  );
}


