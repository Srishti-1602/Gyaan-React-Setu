import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import apiComm from './backendIntegration';
import { getDatabase, ref, set, push } from 'firebase/database';


function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState(null); // Store the userId here


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid); // Set the userId if the user is logged in
      } else {
        setIsLoggedIn(false);
        setUserId(null); // Reset the userId if the user is not logged in
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateQueryStatus = async (userId) => {
    const database = getDatabase();
    const queryRef = ref(database, `users/${userId}/Queries/currentQueryStatus`);
    await set(queryRef, 'processing');
  };

  const createNewQuery = async (userId, query) => {
    const database = getDatabase();
    const queriesRef = ref(database, `users/${userId}/Queries`);
    const newQueryRef = push(queriesRef);
    const newQueryId = newQueryRef.key;
    const newQueryData = {
      Query: query,
      Saved: 'no',
      Status: 'processing',
      Subject: '-'
    };

    await set(newQueryRef, newQueryData);

    return newQueryId;
  };

  const updateQueryDeliveryStatus = async (userId, queryId) => {
    const database = getDatabase();
    const queryStatusRef = ref(database, `users/${userId}/Queries/${queryId}/Status`);
    const queryRef = ref(database, `users/${userId}/Queries/currentQueryStatus`);
    await set(queryStatusRef, 'delivered');
    await set(queryRef, 'static');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      setRedirectToLogin(true);
      return;
    }

    setIsProcessing(true);

    try {
      await updateQueryStatus(userId); // Use the userId here
      const queryId = await createNewQuery(userId, searchText);
      const { data } = await apiComm(searchText);
      console.log(JSON.parse(data));
      onSearch(JSON.parse(data));
      await updateQueryDeliveryStatus(userId, queryId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);

    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleSubmit} id="search-form">
      <input
        type="search"
        className="searchbar"
        placeholder="Press Enter to Generate Notes..."
        name="search"
        id="search-input"
        value={searchText}
        onChange={handleInputChange}
        disabled={isProcessing}
      />
    </form>
  );
}

export default Search;