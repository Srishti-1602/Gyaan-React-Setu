import React, { useState, useEffect } from 'react';
import apiComm from './backendIntegration';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await apiComm(searchText);
      console.log(JSON.parse(data));
      onSearch(JSON.parse(data));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    //setSearchText('');
  };


const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      handleSearch(event);
    } else {
      setRedirectToLogin(true);
    }
  };


  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit} id='search-form'>
    
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