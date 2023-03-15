import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './main.css';

export function YourTopics() {
  return (
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
  );
}

export function SaveNotesDiv() {
  return (
    <div className='saveNotesDiv'>
      <button type='button' className='savebutt' id='save-prompt-button'>
        Save
      </button>
    </div>
  );
}

export default function Main() {
    return (
        <div className='rectnotes'> 
			<div id='Summary-Preview'></div>
			<div id="tree-view"></div>
		</div>
);
}
