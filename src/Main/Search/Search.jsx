import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import apiComm from './backendIntegration';
import { getDatabase, ref, set, push } from 'firebase/database';
import { setQueryId } from './queryIdManager';

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState(null); // Store the userId here

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasNIdParam = queryParams.has('NId');

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
    setQueryId(newQueryId);
    const newQueryData = {
      Query: query,
      Saved: 'no',
      Status: 'processing',
      Subject: '-',
      Queried_At: new Date().toISOString(),
    };

    await set(newQueryRef, newQueryData);

    return newQueryId;
  };

  const updateQueryDeliveryStatus = async (userId, queryId) => {
    const database = getDatabase();
    const queryStatusRef = ref(database, `users/${userId}/Queries/${queryId}/Status`);
    const queryRef = ref(database, `users/${userId}/Queries/currentQueryStatus`);
    await set(queryRef, 'static');
    await set(queryStatusRef, 'delivered');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      await updateQueryStatus(userId); // Use the userId here
      const queryId = await createNewQuery(userId, searchText);
      if (hasNIdParam) {
        const newUrl = location.pathname; // Remove the parameter NId from the URL
        navigate(newUrl);
        const dataNull = {};
        onSearch(dataNull);
        const { data } = await apiComm(searchText);
        console.log(JSON.parse(data));
        onSearch(JSON.parse(data));
        await updateQueryDeliveryStatus(userId, queryId);
      } else {
        const { data } = await apiComm(searchText);
        console.log(JSON.parse(data));
        onSearch(JSON.parse(data));
        await updateQueryDeliveryStatus(userId, queryId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

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
