import React, { useState } from 'react';
import apiComm from './backendIntegration';
// import { Navigate } from 'react-router-dom';

export default function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  // const [redirectToLogin, setRedirectToLogin] = useState(false);
  

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

  // const isLoggedIn = onSearch.isLoggedIn;

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (isLoggedIn) {
//       handleSearch(event);
//     } else {
//        setRedirectToLogin(true); 
//     }
//   };

//  if (redirectToLogin) {
//     return <Navigate to="/login" />;
//   }

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
