import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './main.css';
import Navbar from '../Nav/Nav.jsx';

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
		<div id="tree-view"></div>
		</div>
</div>
  );
}


