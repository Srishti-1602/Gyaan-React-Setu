import '../main.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database'; // Import Firebase modules for Realtime Database

const PublicNoteData = ({ userId, noteId }) => {
    console.log(noteId);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasNIdParam = queryParams.has('NId');
  const [showUserMain, setShowUserMain] = useState(false);

  useEffect(() => {
    if (!hasNIdParam) {
      return;
    }

    const database = getDatabase();
    const noteRef = ref(database, `notes/${noteId}`);

    get(noteRef)
      .then((snapshot) => {
          const noteData = snapshot.val();

          console.log(noteData);
          
          console.log(noteData.created_by);
          console.log(userId);

        if (noteData && noteData.created_by !== userId) {
          setShowUserMain(true);
        }
      })
      .catch((error) => {
        console.error('Error retrieving note data:', error);
      });
  }, [hasNIdParam, userId, noteId]);

  if (!hasNIdParam && showUserMain) {
    return null; // Return null if NId parameter is not present or showUserMain is false
  }

  return (
    <div className='User-Main'>
      <span className='MainUser'>Username</span>
      <span>Last edited date</span>
    </div>
  );
};

export default PublicNoteData;
