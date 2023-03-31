import React, { useState } from 'react';
import apiComm from './backendIntegration';

export default function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const { data } = await apiComm(searchText);
      console.log(JSON.parse(data));
      onSearch(JSON.parse(data));
    } catch (error) {
      console.error(error);
    }
    setSearchText('');
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <form onSubmit={handleSearch} id='search-form'>
      <input
        type='search'
        className='searchbar'
        placeholder=' Press Enter to Generate Notes...'
        name='search'
        id='search-input'
        value={searchText}
        onChange={handleInputChange}
      />
    </form>
  );
}
